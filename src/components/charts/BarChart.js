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
import Typography from '@mui/material/Typography';
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
          display: false, // Ocultamos la etiqueta 'Cryptocurrencies'
        },
      },
      y: {
        type: 'linear', // Escala lineal para mostrar barras proporcionales al valor real
        beginAtZero: true, // Empezar desde cero para una comparación más precisa
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
          // Ajustar la cantidad de marcas para una mejor legibilidad
          count: 8,
        },
        title: {
          display: true,
          text: 'Current price (USD)',
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
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
        boxShadow: `0 8px 24px 0 ${alpha(theme.palette.mode === 'dark' ? '#000' : '#000', 0.12)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 28px 0 ${alpha(theme.palette.mode === 'dark' ? '#000' : '#000', 0.15)}`,
          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        },
        // Efectos decorativos crypto
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 120,
          height: 120,
          background: theme.palette.mode === 'dark' 
            ? `radial-gradient(circle, ${alpha(amber[500], 0.1)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(amber[500], 0.07)} 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -30,
          left: 20,
          width: 80,
          height: 80,
          background: theme.palette.mode === 'dark' 
            ? `radial-gradient(circle, ${alpha(deepPurple[500], 0.15)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(deepPurple[500], 0.07)} 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 0,
        }
      }}
    >
      <CardHeader
        title={
          <Typography
            variant='h5'
            sx={{ 
              fontWeight: 700, 
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -4,
                left: 0,
                width: '40px',
                height: '3px',
                background: `linear-gradient(90deg, ${amber[500]}, ${deepPurple[500]})`,
                borderRadius: '8px',
              }
            }}
          >
            Top 10 Most Expensive Cryptocurrencies
          </Typography>
        }
        subheader={
          <Typography
            variant='subtitle2'
            sx={{ 
              mt: 1,
              color: alpha(theme.palette.text.secondary, 0.8),
              fontSize: '0.875rem'
            }}
          >
            Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price
          </Typography>
        }
        sx={{ 
          p: 3, 
          pb: 1,
          '& .MuiCardHeader-action': { mr: 0 }
        }}
      />
      <Box
        sx={{
          mx: 3,
          height: '1px',
          background: `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.divider, 0.7)}, ${alpha(theme.palette.divider, 0)})`
        }}
      />
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ height: 400, position: 'relative' }}>
          <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChart;
