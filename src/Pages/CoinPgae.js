import React from 'react'
//useparams
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';



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
  const [flag, setflag] = useState(false);



  const fetchHistoricData = async () => {

    //console.log(id);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );

    const val = data.prices;
    setflag(true);
    setHistoricData(val);
    console.log(historicData);
  };


  //console.log("Hello");

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historicData, days]);



  return (
    <>
      <div className="coinPage">
        Coin Page
        
      </div>
    </>
  )
}

export default CoinPgae



// const CoinPgae = () => {
//   return (
//     <div>
//       coinPage
//     </div>
//   )
// }

// export default CoinPgae
