import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme, alpha } from '@mui/material/styles';
import { deepPurple, purple, indigo, blue, green, red, amber, teal, pink, cyan } from '@mui/material/colors';

// Material Icons
import SearchIcon from '@mui/icons-material/Search';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import TablePaginationActions from './TablePaginationActions';

const CoinMarkets = ({ coins = [], loading, error }) => {
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: '#888' }}>Loading...</Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'red' }}>Error loading data</Box>
    );
  }

  return (
    <>
      <Box>
        <Box sx={{ marginTop: 3 }}>
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
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                right: 30,
                width: 60,
                height: 60,
                background: theme.palette.mode === 'dark' 
                  ? `radial-gradient(circle, ${alpha(indigo[500], 0.1)} 0%, transparent 70%)`
                  : `radial-gradient(circle, ${alpha(indigo[500], 0.07)} 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: 0,
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, p: 2 }}>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' sx={{ color: alpha(theme.palette.primary.main, 0.8) }}>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: alpha(theme.palette.background.paper, 0.5),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.background.paper, 0.7)
                      },
                      boxShadow: `0 2px 8px ${alpha(theme.palette.mode === 'dark' ? '#000' : '#000', 0.08)}`
                    }
                  }}
                  placeholder='Search a cryptocurrency'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{ paddingTop: 3 }}>
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
              left: -50,
              width: 120,
              height: 120,
              background: theme.palette.mode === 'dark' 
                ? `radial-gradient(circle, ${alpha(blue[500], 0.08)} 0%, transparent 70%)`
                : `radial-gradient(circle, ${alpha(blue[500], 0.05)} 0%, transparent 70%)`,
              borderRadius: '50%',
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -30,
              right: 50,
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShowChartIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
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
                      background: `linear-gradient(90deg, ${blue[500]}, ${purple[500]})`,
                      borderRadius: '8px',
                    }
                  }}
                >
                  Cryptocurrency Market
                </Typography>
              </Box>
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
                Real-time prices and market data for top cryptocurrencies
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
          <Box sx={{ minWidth: 1050, paddingBottom: 3, position: 'relative', zIndex: 1 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { borderBottom: `2px solid ${alpha(theme.palette.divider, 0.2)}` } }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>Symbol</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>24h</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>Volume</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.palette.primary.main, py: 2 }}>Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredCoins.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredCoins
                ).map((coin, index) => (
                  <TableRow 
                    hover 
                    key={coin.id}
                    sx={{ 
                      transition: 'all 0.2s ease',
                      backgroundColor: index % 2 === 0 ? 'transparent' : alpha(theme.palette.background.paper, 0.4),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.05)}`
                      },
                      '& td': { 
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        py: 1.5
                      }
                    }}
                  >
                    <TableCell>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          height: 38, 
                          width: 38, 
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.8)})`,
                          boxShadow: `0 2px 6px ${alpha(theme.palette.common.black, 0.1)}`,
                          p: 0.5
                        }}
                      >
                        <img
                          src={coin.image}
                          alt=''
                          style={{ height: '28px', width: '28px', borderRadius: '6px' }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{coin.name}</TableCell>
                    <TableCell sx={{ color: alpha(theme.palette.text.secondary, 0.8), textTransform: 'uppercase', fontSize: '0.85rem' }}>{coin.symbol}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>${coin.current_price.toFixed(2)}</TableCell>
                    <TableCell>
                      {coin.price_change_percentage_24h > 0 ? (
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: theme.palette.success.main,
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.success.main, 0.1),
                            borderRadius: '6px',
                            px: 1,
                            py: 0.5
                          }}
                        >
                          +{coin.price_change_percentage_24h.toFixed(2)}%
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: theme.palette.error.main,
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                            borderRadius: '6px',
                            px: 1,
                            py: 0.5
                          }}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>${coin.total_volume.toLocaleString()}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>${coin.market_cap.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={coins.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  '& .MuiTablePagination-toolbar': {
                    borderRadius: '12px',
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.08)}`,
                    px: 2
                  },
                  '& .MuiTablePagination-displayedRows': {
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }
                }}
              />
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default CoinMarkets;
