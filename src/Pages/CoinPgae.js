import React from 'react'
//useparams
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';
import Chart from 'chart.js/auto';

import {Button} from '@mui/material'




const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const currency = "usd";


const CoinPgae = () => {

  const coin = useParams();
  const id = coin.coinId;

  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {


    //console.log(id);
    await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    ).then((res) => {
      console.log(id);
      setHistoricData(res.data.prices);
      setFlag(true);
      console.log(historicData);
    }).catch((err) => {
      console.log(err);
    });
  };


  //console.log("Hello");
  const [CoinName, setCoinName] = useState("");

  useEffect(() => {
    fetchHistoricData();
    
    setCoinName(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, days]);



  return (
    <div>
      <div className='HeaderCoin'>
        <h1>{CoinName.toLocaleUpperCase()}</h1>
      </div>
      <div className='Buttons_graph'>
      <Button onClick={() => setDays(1)}>In a Day</Button>
      <Button onClick={() => setDays(30)}>In a 30 days</Button>
      <Button onClick={() => setDays(90)}>In a 90 Days</Button>
      <Button onClick={() => setDays(365)}>In a Year</Button>
      </div>
      <div className='Graph'>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}

            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >

            </div>
          </>
        )}
      </div>
      
    </div>
  )
}

export default CoinPgae
