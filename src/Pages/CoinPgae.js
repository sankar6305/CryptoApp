import React from 'react'
//useparams
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';
import Chart from 'chart.js/auto';

import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ReactHtmlParser from "react-html-parser";




const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "7 Days",
    value: 7,
  },
  {
    label: "15 Days",
    value: 15,
  },
  {
    label: "30 Months",
    value: 30,
  },
  {
    label: "1 Year",
    value: 365,
  },
  {
    label: "2 Year",
    value: 730,
  },
];

const currency = "rupees";


const CoinPgae = () => {

  const coin = useParams();
  const [Image, setImage] = useState("");
  const id = coin.coinId;
  const [Desc, setDisc] = useState("");

  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const [Detail, setDetail] = useState([]);

  const fetchHistoricData = async () => {


    //console.log(id);
    await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`
    ).then((res) => {
      console.log(id);
      setHistoricData(res.data.prices);
      setFlag(true);
      console.log(historicData);
    }).catch((err) => {
      console.log(err);
    });

    await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    ).then((res) => {
      console.log("Name of the coin");
      console.log(res.data.description.en);
      setDisc(res.data.description.en);
      setImage(res.data.image.large);
      Detail.push(res.data.market_cap_rank);
      Detail.push(res.data.market_data.current_price.inr);
      Detail.push(res.data.market_data.market_cap.inr);
      Detail.push(res.data.name);
      setDetail(Detail);
      console.log(Detail);
    }).catch((err) => {
      console.log("Error occured");
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
    <div className='CoinPage'>
      <div className='GraphCoin'>
        <div className='ApplyFlex'>
          <div className='HeaderCoin'>
            <h1>{Detail[3]}</h1>
          </div>
        </div>
        <div className='Content'>
          {/* Take the image from Desc.image.thumb */}
          <img src={Image} alt="Coin" />
        </div>
        <div className='Description'>
          <Typography variant="subtitle1" className="description">
            {ReactHtmlParser(Desc?.split(". "))}.
          </Typography>
        </div>
        { /* Writing Indetails of the crypto coin by Detail */}
        <div className='Details'>
          <div className='Detail'>
            <Typography variant="subtitle1" className="detail">
              <span className="detail__name">Rank</span>
              <span className="detail__value">{Detail.length > 0 ? Detail[0] : "..."}</span>
            </Typography>
          </div>
          <div className='Detail'>
            <Typography variant="subtitle1" className="detail">
              <span className="detail__name">Price</span>
              <span className="detail__value">{Detail.length > 0 ? Detail[1] : "..."}</span>
            </Typography>
          </div>
          <div className='Detail'>
            <Typography variant="subtitle1" className="detail">
              <span className="detail__name">Market Cap</span>
              <span className="detail__value">{Detail.length > 0 ? Detail[2] : "..."}</span>
            </Typography>
          </div>
        </div>

        <div className='Buttons_graph'>
          <Button onClick={() => setDays(1)}>In a Day</Button>
          <Button onClick={() => setDays(7)}>In a 7 days</Button>
          <Button onClick={() => setDays(15)}>In a 15 days</Button>
          <Button onClick={() => setDays(30)}>In a 30 Days</Button>
          <Button onClick={() => setDays(365)}>In a Year</Button>
          <Button onClick={() => setDays(730)}>In a 2 Years</Button>
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
                      borderColor: "#005EFF",
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
    </div>
  )
}

export default CoinPgae
