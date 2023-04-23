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
import { Button } from '@mui/material';
import { useFirebase } from '../Context/Firebase';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'rank', label: 'Rank', minWidth: 170 },
  { id: 'price', label: 'Current Price', minWidth: 170 },
  { id: 'priceChange1h', label: 'price Change in 1h', minWidth: 170 },
  { id: 'priceChange1d', label: 'Price Change in 1day', minWidth: 170 },
  { id: 'priceChange1w', label: 'Price Change in 1day', minWidth: 170 },
  { id: 'Link', label: 'Link', minWidth: 170 },
  { id: 'Buy', label: 'Buy', minWidth: 170 },

];

let vt = 0;

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
  let flaag = false;
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const firebase = useFirebase();
  const [data1, setData1] = useState([]);

  useEffect(() => {
    setRows(firebase.drt);
    console.log(firebase.drt);
    flaag = false;
  }, [firebase.drt, data1]);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBuy = async (id, name, current_price, index) => {
    if (firebase.isLoggedIn === false) {
      alert("Please Login First");
      return;
    }
    // console.log(row);
    await firebase.BuyingtheCrypto(id, name, current_price, index).then((name1) => {
      alert("You Bought the Crypto " + name);
    }).catch((error) => {
      alert(error);
    });
  }

  const handleLink = async (id) => {
    let r = "";
    for (let i = 0; i < id.length; i++) {
      if (id[i] >= 'a' && id[i] <= 'z') {
        r += id[i];
      }
    }
    try {
      await axios.get(`https://api.coingecko.com/api/v3/coins/${r}`).then((res) => {
        //window.location.href = `/coin/${r}`;
        window.open(`/coin/${r}`, '_blank');
      });
    } catch (error) {
      //
      try {
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => {
          //window.location.href = `/coin/${id}`;
          window.open(`/coin/${id}`, '_blank');
        });
      }
      catch (error) {
        alert("Such coin has no much data and no much trust score");
      }

      //window.open(`/coin/${id}`, '_blank');
      //window.location.href = `/coin/${id}`;
    }
    //
    // window.location.href = `/coin/${r}`;
  }


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
                      style={{ minWidth: column.minWidth, color: 'white', fontWeight: 100, backgroundColor: '#005EFF' }}
                      onClick={() => {
                        firebase.SortingData(column.id);
                        setData1(vt);
                        vt++;
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} >
                              {column.format && typeof value === 'number' && column.id !== 'Link'
                                ? column.format(value)
                                : (column.id === 'Link' ? <a onClick={() => handleLink(row.id)}>Link to detail</a> : (column.id === 'Buy' ? <Button onClick={() => handleBuy(row.id, row.name, row.price, index)}>Buy the crypto</Button> : value))}
                            </TableCell>
                          );
                        })},
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 25, 50, 100]}
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