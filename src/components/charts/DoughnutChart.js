import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { deepPurple, purple, indigo, blue, green, red, amber, teal, pink, cyan } from '@mui/material/colors';
import { useTheme, alpha } from '@mui/material/styles';
import { colors } from '@mui/material';

Chart.register(...registerables, Tooltip, Legend);

const DoughnutChart = ({ chartData = [], loading, error }) => {
  const theme = useTheme();
  
  // Crear una referencia para el gráfico
  const chartRef = useRef(null);
  
  // Limpiar el gráfico cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader
          title='Top 5 Cheapest Cryptocurrencies'
          subheader='Top 5 Cheapest Cryptocurrencies Above $100 Measured By Their Market Price'
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
          title='Top 5 Cheapest Cryptocurrencies'
          subheader='Top 5 Cheapest Cryptocurrencies Above $100 Measured By Their Market Price'
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
          title='Top 5 Cheapest Cryptocurrencies'
          subheader='Top 5 Cheapest Cryptocurrencies Above $100 Measured By Their Market Price'
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
    // sort it by current_price in ascending order,
    // filter out 0, NaN and values below $100,
    // take top 5 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => a.current_price - b.current_price)
      .filter((coin) => coin.current_price > 100)
      .slice(0, 5)
      .map((coin) => coin.name),
    datasets: [
      {
        data: chartData
          .sort((a, b) => (a.current_price > b.current_price ? 1 : -1))
          .filter((coin) => coin.current_price > 100)
          .slice(0, 5)
          .map((coin) => coin.current_price),
        backgroundColor: function(context) {
          const index = context.dataIndex;
          const colors = [
            { start: amber[600], end: amber[300] },
            { start: red[600], end: red[300] },
            { start: blue[600], end: blue[300] },
            { start: green[600], end: green[300] },
            { start: purple[600], end: purple[300] }
          ];
          
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, colors[index % colors.length].start);
          gradient.addColorStop(1, colors[index % colors.length].end);
          return gradient;
        },
        borderWidth: 2,
        borderColor: theme.palette.background.paper,
        borderRadius: 4,
        hoverOffset: 15,
        hoverBorderWidth: 3,
        hoverBorderColor: theme.palette.common.white,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
      easing: 'easeOutQuart'
    },
    cutout: '50%', // Mantenemos el recorte del donut
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        padding: 25,
        labels: {
          color: theme.palette.text.primary,
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 13,
            weight: 'bold',
            family: '"Roboto", "Helvetica", "Arial", sans-serif'
          },
          // Forzamos a usar nombres personalizados para las leyendas
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                
                return {
                  text: label, // Usamos el nombre de la moneda aquí
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
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
        cornerRadius: 8,
        usePointStyle: true,
        boxPadding: 6,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        callbacks: {
          // Personalización segura del tooltip
          title: function(context) {
            // Usar directamente los labels definidos en data
            return data.labels[context[0].dataIndex];
          },
          label: function(context) {
            // Mostrar el valor en formato moneda
            return numeral(context.raw).format('$0,0.00');
          }
        }
      },
      datalabels: {
        display: true,
        color: colors.common.white,
        textStrokeColor: 'rgba(0, 0, 0, 0.4)',
        textStrokeWidth: 2,
        textShadowBlur: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        align: 'center',
        anchor: 'center',
        offset: 0,
        labels: {
          title: {
            font: {
              weight: 'bold',
              size: 13,
              family: '"Roboto", "Helvetica", "Arial", sans-serif'
            },
          },
        },
        formatter: (value) => numeral(value).format('$0,0.00'),
      },
    },
    layout: {
      padding: {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
      },
    },
    // Efectos de hover
    hover: {
      mode: 'nearest',
      animationDuration: 200
    },
  };

  return (
    <Card>
      <CardHeader
        title='Top 5 Cheapest Cryptocurrencies'
        subheader='Top 5 Cheapest Cryptocurrencies Above $100 Measured By Their Market Price'
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 400, position: 'relative' }}>
          <Pie ref={chartRef} data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
