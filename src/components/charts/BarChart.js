import React, { useState, useEffect, useRef } from 'react';
import { 
  Chart, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  deepPurple,
  lightBlue,
  pink,
  purple,
  teal,
  lime,
  amber,
  cyan,
  indigo,
  orange
} from '@mui/material/colors';
import { useTheme, alpha } from '@mui/material/styles';

// Registramos todos los elementos necesarios de Chart.js
Chart.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend
);

const BarChart = ({ chartData = [], loading, error }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  // Procesamos los datos para definir mejor la escala visual
  const top10Prices = chartData
    .sort((a, b) => b.current_price - a.current_price)
    .slice(0, 10)
    .map((coin) => coin.current_price);
  
  // Para mejorar la visibilidad, usaremos escala logarítmica
  // pero con algunos ajustes para que se vea bien
  const maxPrice = top10Prices.length > 0 ? Math.max(...top10Prices) : 1000;
  const minPrice = top10Prices.length > 0 ? Math.min(...top10Prices) : 0.1;
  // Usamos un valor mínimo para el eje Y que permita ver mejor las barras pequeñas
  const minY = Math.max(0.1, minPrice * 0.1); // Ajustamos para dar espacio visual

  if (loading) {
    return (
      <Card>
        <CardHeader
          title='Top 10 Most Expensive Cryptocurrencies'
          subheader='Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price'
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#888', fontSize: 18 }}>Loading...</span>
          </Box>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardHeader
          title='Top 10 Most Expensive Cryptocurrencies'
          subheader='Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price'
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'red', fontSize: 18 }}>Error loading data</span>
          </Box>
        </CardContent>
      </Card>
    );
  }
  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader
          title='Top 10 Most Expensive Cryptocurrencies'
          subheader='Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price'
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#888', fontSize: 18 }}>No data available</span>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const data = {
    // copy data from the state to a new array,
    // sort it by current_price in descending order,
    // take top 10 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => b.current_price - a.current_price)
      .slice(0, 10)
      .map((coin) => coin.name),
    datasets: [
      {
        data: chartData
          .sort((a, b) => b.current_price - a.current_price)
          .slice(0, 10)
          .map((coin) => coin.current_price),
        label: `${chartData.length} Most Expensive Cryptocurrencies`,
        backgroundColor: function(context) {
          const index = context.dataIndex;
          const colors = [
            { start: amber[600], end: amber[300] },
            { start: theme.palette.error.dark, end: theme.palette.error.light },
            { start: theme.palette.primary.dark, end: theme.palette.primary.light },
            { start: theme.palette.success.dark, end: theme.palette.success.light },
            { start: deepPurple[700], end: deepPurple[300] },
            { start: pink[600], end: pink[300] },
            { start: lightBlue[600], end: lightBlue[300] },
            { start: teal[700], end: teal[400] },
            { start: purple[600], end: purple[300] },
            { start: indigo[600], end: indigo[300] }
          ];
          
          if (!context.chart.chartArea) {
            return colors[index % colors.length].start;
          }
          
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, colors[index % colors.length].start);
          gradient.addColorStop(1, colors[index % colors.length].end);
          return gradient;
        },
        borderRadius: 6,
        borderWidth: 1,
        borderColor: function(context) {
          const index = context.dataIndex;
          const colors = [
            amber[800], theme.palette.error.dark, theme.palette.primary.dark,
            theme.palette.success.dark, deepPurple[800], pink[700],
            lightBlue[700], teal[800], purple[700], indigo[700]
          ];
          return colors[index % colors.length];
        },
        hoverBorderWidth: 2,
        hoverBorderColor: theme.palette.common.white,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        padding: 12,
        boxPadding: 8,
        cornerRadius: 8,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + numeral(context.raw).format('$0,0.00');
          },
          // Personalizamos el título del tooltip para mostrar el nombre de la criptomoneda
          title: function(context) {
            return context[0].label;
          }
        }
      },
      datalabels: {
        display: isMd ? true : false,
        color: theme.palette.common.white,
        textStrokeColor: 'rgba(0, 0, 0, 0.4)',
        textStrokeWidth: 2,
        textShadowBlur: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        anchor: 'end',
        align: 'top',
        offset: 0,
        labels: {
          title: {
            font: {
              weight: 'bold',
              size: 14,
              family: '"Roboto", "Helvetica", "Arial", sans-serif'
            },
            padding: {
              top: 10,
              bottom: 0
            },
          },
        },
        formatter: (value) => numeral(value).format('$0,0.00'),
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.primary,
          maxRotation: 50,
          minRotation: 35,
          autoSkip: false,
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 8,
        },
        title: {
          display: true,
          text: 'Cryptocurrencies',
          color: theme.palette.text.primary,
          font: {
            weight: 'bold',
            size: 16,
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          },
          padding: {
            top: 20,
            bottom: 10
          }
        },
      },
      y: {
        type: 'logarithmic', // Escala logarítmica para mejor visualización
        min: minY,          // Valor mínimo ajustado para mejor visualización
        grid: {
          color: alpha(theme.palette.divider, 0.1),
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 10,
          font: {
            size: 12,
          },
          callback: (value) => numeral(value).format('$0,0.00'),
          // Mostrar más marcas intermedias
          count: 10,
        },
        title: {
          display: true,
          text: 'Current price (logarithmic scale)',
          color: theme.palette.text.primary,
          font: {
            weight: 'bold',
            size: 16,
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          },
          padding: {
            bottom: 10,
            top: 0
          }
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 15
      },
    },
    // Añadimos efectos de hover para una mejor experiencia de usuario
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 200
    },
  };

  return (
    <Card>
      <CardHeader
        title='Top 10 Most Expensive Cryptocurrencies'
        subheader='Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price'
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 400, position: 'relative' }}>
          <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChart;
