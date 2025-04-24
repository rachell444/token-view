import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
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
import { useTheme, alpha } from '@mui/material/styles';
import { colors } from '@mui/material';
import { deepPurple, purple, indigo, blue, green, red, amber, teal, pink, cyan } from '@mui/material/colors';

Chart.register(...registerables, Tooltip, Legend, Filler);

const LineChart = ({ chartData = [], loading, error }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  
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
          title='Top 5 Cryptocurrencies By All-Time-Low'
          subheader='Top 5 Cryptocurrencies Measured By Their All-Time-Low (ATL)'
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
          title='Top 5 Cryptocurrencies By All-Time-Low'
          subheader='Top 5 Cryptocurrencies Measured By Their All-Time-Low (ATL)'
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
          title='Top 5 Cryptocurrencies By All-Time-Low'
          subheader='Top 5 Cryptocurrencies Measured By Their All-Time-Low (ATL)'
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
    // sort it by ath in descending order,
    // take top 5 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => b.atl - a.atl)
      .slice(0, 5)
      .map((coin) => coin.name),
    datasets: [
      {
        label: 'All-Time-Low',
        fontColor: colors.common.white,
        data: chartData
          .sort((a, b) => b.atl - a.atl)
          .slice(0, 5)
          .map((coin) => coin.ath),
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return alpha(pink[500], 0.1);
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, alpha(pink[500], 0.0));
          gradient.addColorStop(0.5, alpha(pink[500], 0.1));
          gradient.addColorStop(1, alpha(pink[400], 0.2));
          return gradient;
        },
        borderWidth: 3,
        borderColor: pink[500],
        pointBackgroundColor: pink[400],
        pointBorderColor: theme.palette.background.paper,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3, // Para una curva más suave
        borderCapStyle: 'round',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutCubic'
    },
    interaction: {
      mode: 'index',
      intersect: false
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
        usePointStyle: true,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + numeral(context.raw).format('$0,0.00');
          }
        }
      },
      datalabels: {
        display: isMd ? true : false,
        color: theme.palette.background.paper,
        textStrokeColor: pink[500],
        textStrokeWidth: 1,
        textShadowBlur: 3,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        backgroundColor: function(context) {
          return pink[500];
        },
        borderRadius: 4,
        padding: 6,
        align: 'bottom',
        anchor: 'end',
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
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          color: alpha(theme.palette.divider, 0.1)
        },
        ticks: {
          color: theme.palette.text.secondary,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 10,
        },
      },
      y: {
        position: 'right',
        grid: {
          color: alpha(theme.palette.divider, 0.1),
          borderDash: [5, 5],
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 10,
          font: {
            size: 11,
          },
          callback: (value) => numeral(value).format('$0,0.00'),
        },
      },
    },
    elements: {
      line: {
        tension: 0.3
      },
      point: {
        borderWidth: 2,
        hoverRadius: 6,
        hoverBorderWidth: 3,
        hoverBorderColor: theme.palette.background.paper,
        hoverBackgroundColor: pink[500]
      }
    },
    layout: {
      padding: {
        top: 10,
        right: 25, // Más espacio para los valores en el eje Y (están a la derecha)
        bottom: 10,
        left: 10
      },
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
          top: -20,
          right: 100,
          width: 80,
          height: 80,
          background: theme.palette.mode === 'dark' 
            ? `radial-gradient(circle, ${alpha(pink[400], 0.1)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(pink[400], 0.07)} 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -30,
          right: 20,
          width: 60,
          height: 60,
          background: theme.palette.mode === 'dark' 
            ? `radial-gradient(circle, ${alpha(purple[500], 0.15)} 0%, transparent 70%)`
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
                background: `linear-gradient(90deg, ${pink[500]}, ${purple[500]})`,
                borderRadius: '8px',
              }
            }}
          >
            Top 5 Cryptocurrencies By All-Time-Low
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
            Top 5 Cryptocurrencies Measured By Their All-Time-Low (ATL)
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
          <Line ref={chartRef} data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LineChart;
