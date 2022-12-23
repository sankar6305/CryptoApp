import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';


const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'market_cap_rank', label: 'Rank', minWidth: 170 },
  { id: 'current_price', label: 'Current Price', minWidth: 170 },
  { id: 'low_24h', label: 'Low 24h', minWidth: 170 },
  { id: 'high_24h', label: 'High 24h', minWidth: 170 },
  { id: 'market_cap_change_24h', label: 'Market Change in 24 Hours', minWidth: 170 },
  { id: 'Link', label: 'Link', minWidth: 170 },

];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { id, market_cap_rank, name, image, current_Price, low_24h, high_24h};
// }


// const data = async () => {
//   const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
//   const data = await response.json();
//   return data;
// }


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
  },
  Header: {
    background: '#76ff03',
    fontWeight: 20,
  },
  element: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeight: 500,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #81c784 90%)',
  },
});




export default function Home() {

  const classes = useStyles();

  const [rows, setRows] = useState([]);


  useEffect(() => {
    refreshPage();
  }, []);


  const refreshPage = () => {
    //setIsLoading(true);
    axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    ).then((response) => {
      //console.log(response.data);
      //setIsLoading(false);
      setRows(response.data);
      //console.log(coins);
    });
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  return (
    <>
      <div className='Border'>
        <Paper sx={{ width: '100%' }}>
          <TableContainer>
            <Table>
              {/* //stickyHeader aria-label="sticky table" */}
              <TableHead>
                <TableRow className={classes.Header}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, color: 'white', fontWeight: 100, backgroundColor: '#76ff03' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} style={{ color: 'white', backgroundColor: 'black' }}>
                              {column.format && typeof value === 'number' && column.id !== 'Link'
                                ? column.format(value)
                                : (column.id === 'Link' ? <a onClick={() => { window.location.href = `/coin/${row.id}` }}>Link to detail</a> : value)}
                            </TableCell>
                          );
                        })},
                        {/* <a onClick={() => { window.location.href = `/coin/56` }}>Link to detail</a> */}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 25, 50, 250]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}