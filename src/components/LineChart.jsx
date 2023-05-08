import React from 'react'
import { Line  } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
import {
    Typography,
    Divider,
    Box,
  } from "@mui/material";
  import Grid from "@mui/material/Unstable_Grid2";

const LineChart = ({coinHistory,currentPrice,coinName}) => {
    const coinPrice = [];
    const coinTimestamp = [];
  
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinPrice.push(coinHistory?.data?.history[i].price);
    }
  
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
      coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }
    const data = {
      labels: coinTimestamp,
      datasets: [
        {
          label: 'قیمت به دلار',
          data: coinPrice,
          fill: false,
          backgroundColor: '#0071bd',
          borderColor: '#0071bd',
        },
      ],
    };
  
    const options = {
        scales: {
            yAxes: 
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
        }
    };
  return (
    <>
    <Typography variant="h4" component={"h3"}>
        جدول قیمت {coinName} 
    </Typography>
    <Typography variant='h5' component={"h5"}>
    {coinHistory?.data?.change} %
    </Typography>
    <Typography variant='h5' component={"h5"}>
        قیمت حال حاظر  {currentPrice}: {coinName}
    </Typography>
    <Line data={data} options={options} />
    </>
  )
}

export default LineChart