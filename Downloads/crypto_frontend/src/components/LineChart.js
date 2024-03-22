import React from 'react'
import {Line} from 'react-chartjs-2';
import {Col, Row, Typography,} from 'antd';
import Chart from 'chart.js/auto';

export default function LineChart({coinHistory, currentPrice, coinName}) {

   
    const coinPrice = [];
    const coinTimestamp = [];
    
    for(let i=0;i<coinHistory?.data?.data?.history?.length; i++){
        coinPrice.push(coinHistory.data.data.history[i].price)
        coinTimestamp.push(new Date(coinHistory.data.data.history[i].timestamp).toLocaleDateString());
    }
    console.log(coinTimestamp);
    

    
    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };

    const options = {
        scale: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
                // stacked: true,
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM DD YYYY'
                    }
                },
            },
        ]
        },
      };


    const {Title} = Typography;
  return (
    <>
    <Row className='chart-header' style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className='price-container' style={{display:"flex",alignItems:"center"}}>
            <Title level={5} className="price-change" style={{margin:"0px"}}>Change: {coinHistory?.data?.data?.change}%</Title>
            <Title level={5} className="current-change" style={{padding:"0px",margin:"0px 30px 2px 10px"}}>Current {coinName} Price: $ {currentPrice}</Title>

        </Col>
    </Row>
    <Line data={data} options={options}/>
    
    </>
  )
}
