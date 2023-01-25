import React, { useEffect } from 'react';
import { useFirebase } from "../Context/Firebase";
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


const TradePage = () => {
  const [crypto, setCrypto] = useState([]);
  const firebase = useFirebase();
  const [flag, setFlag] = useState(false);
  const HandleOutput = async () => {
    if (firebase.isLoggedIn) {
      await firebase.GetCrypto().then((querySnapshot) => {
        crypto.length = 0;
        querySnapshot.forEach((doc) => {
          const t = doc.data();
          //console.log(doc.data());
          crypto.push(t);
          //console.log(crypto);
        }
        );

        if (crypto.length > 0) {
          setFlag(true);
          //console.log(crypto);
        }
      });
    }
  }

  const [rows, setRow] = useState([]);

  useEffect(() => {
    console.log(firebase.isLoggedIn);
    HandleOutput();
    setRow(firebase.drt);

  }, [flag, crypto, firebase.isLoggedIn, rows]);

  const RemovingFromDataBase = async (item) => {
    console.log(item);
    //setFlag(false);
  }



  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
    { quarter: 5, earnings: 19000 }
  ]

  return (
    <>
      <div className='Trading_Page'>
        <h1 style={{ color: "#005EFF" }}>Trade Page</h1>
        <h1>{crypto.length}</h1>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {crypto.length > 0 && rows.length > 0 ? crypto.map((item, index1) => {
            return (
              <div className='Cards'>
                <Grid item key={data[index1 % 5]}>
                  <Card sx={{ maxWidth: 350 }}>
                    <CardMedia
                      sx={{ height: 170 }}
                      image={rows[item.ind].image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" color="#005EFF" >
                        <a onClick={() => { window.location.href = `/coin/${item.uid}` }}>{item.name}</a>
                      </Typography>
                      <Typography variant="body3" color="#4615b2">
                        <h3><u>Current Price:</u> {rows[item.ind].current_price}₹</h3>
                        <h3><u>Old Price: </u> {item.price}₹</h3>
                        <h3><u>Buy At:</u> {item.BuyAt}</h3>
                        <h3 style={{ display: "inline-block" }}><u>Profit Percentage:  </u><h3 style={{ color: (rows[item.ind].current_price - item.price) / item.price > 0 ? "green" : "red" }}> {((rows[item.ind].current_price - item.price) / item.price).toFixed(6)} %</h3></h3>
                        <h3><u>Profit / Loss: </u><h3 style={{ color: (rows[item.ind].current_price - item.price) / item.price > 0 ? "green" : "red" }}>{(rows[item.ind].current_price - item.price).toFixed(6)} ₹</h3></h3>
                      </Typography>
                    </CardContent>
                    <div className='TradeCarsButtons'>
                      <CardActions>
                        <Button onClick={() => { 
                          firebase.RemoveCrypto(item.BuyAt, item.uid).then(() => {
                            // window.location.reload();
                            setFlag(false);
                            alert(item.name + " Removed");
                          });
                         }}>Remove</Button>
                        <Button onClick={() => { window.location.href = `/coin/${item.uid}` }}>Learn More</Button>
                      </CardActions>
                    </div>
                  </Card>

                </Grid>
              </div>

            )
          }) : <h3>Loding....</h3>
          }
        </Grid>
      </div>

    </>
  )
}

export default TradePage
