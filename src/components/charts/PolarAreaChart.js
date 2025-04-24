import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { deepPurple, purple, indigo, blue, green, red, amber, teal, pink, cyan } from '@mui/material/colors';
import { useTheme, alpha } from '@mui/material/styles';
import { colors } from '@mui/material';

Chart.register(...registerables, Tooltip, Legend);

const PolarAreaChart = ({ chartData = [], loading, error }) => {
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
          title='Top 3 Cryptocurrencies By Market Cap'
          subheader='Top 3 Cryptocurrencies Measured By Their Market Cap'
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
          title='Top 3 Cryptocurrencies By Market Cap'
          subheader='Top 3 Cryptocurrencies Measured By Their Market Cap'
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
          title='Top 3 Cryptocurrencies By Market Cap'
          subheader='Top 3 Cryptocurrencies Measured By Their Market Cap'
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
    // sort it by market_cap in descending order,
    // take top 3 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 3)
      .map((coin) => coin.name),
    datasets: [
      {
        data: chartData
          .sort((a, b) => b.market_cap - a.market_cap)
          .slice(0, 3)
          .map((coin) => coin.market_cap),
        backgroundColor: function(context) {
          const index = context.dataIndex;
          const colors = [
            { start: purple[800], end: purple[500] },
            { start: green[700], end: green[400] },
            { start: red[700], end: red[400] }
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
        hoverOffset: 10,
        hoverBorderWidth: 3,
        hoverBorderColor: theme.palette.common.white,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
      animateRotate: true,
      animateScale: true
    },
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
          pointStyle: 'rectRounded',
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
          title: function(context) {
            return data.labels[context[0].dataIndex];
          },
          label: function(context) {
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
        anchor: 'center',
        align: 'center',
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
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
    },
    // Efectos de hover
    hover: {
      mode: 'nearest',
      animationDuration: 200
    },
    scales: {
      r: {
        ticks: {
          backdropColor: 'transparent',
          color: theme.palette.text.secondary,
          font: {
            size: 11
          },
          z: 100,
          callback: (value) => numeral(value).format('$0,0.0a')
        },
        grid: {
          color: alpha(theme.palette.divider, 0.1)
        },
        angleLines: {
          color: alpha(theme.palette.divider, 0.1),
          lineWidth: 1
        },
        pointLabels: {
          color: theme.palette.text.secondary,
          font: {
            size: 11,
            weight: 'bold'
          }
        }
      }
    }
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
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          background: theme.palette.mode === 'dark' 
            ? `radial-gradient(circle, ${alpha(purple[500], 0.1)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(purple[500], 0.07)} 0%, transparent 70%)`,
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
                background: `linear-gradient(90deg, ${purple[500]}, ${green[500]})`,
                borderRadius: '8px',
              }
            }}
          >
            Top 3 Cryptocurrencies By Market Cap
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
            Top 3 Cryptocurrencies Measured By Their Market Cap
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
          <PolarArea ref={chartRef} data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PolarAreaChart;
