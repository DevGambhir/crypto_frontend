import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import 'antd/dist/antd.min.css';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import priceContext from '../context/PriceContext';
import { useContext } from 'react';

export default function CryptoDetails() {



  const { Title } = Typography;
  const { Option } = Select;
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d')
  const [cryptoDetails, setcryptoDetails] = useState('');
  const [cryptoDesp, setcryptoDesp] = useState(' ');
  const [isFetching,setisFetching] = useState(false)
  const context = useContext(priceContext);
  const { addPrice, showAlert } = context;

  const coinHistory = useGetCryptoHistoryQuery({ coinId, timePeriod });

  // if (coinHistory.status === "pending") {
  //   var isFetching = false

  // }
  // else {
  //   isFetching = true
  // }

  useEffect(() => {

    async function fetching() {

      const data = await fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '28cdb23c62msh794ccc1138347e5p1d004ajsn55e97d7b548c',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      })

      const request = await data.json();


      const cryptoDetail = request?.data?.coin;
      const cryptoDesp = request?.data?.coin.description;

      setcryptoDetails(cryptoDetail)
      setcryptoDesp(cryptoDesp)
      setisFetching(true)


      return data;
    }
    fetching();

  }, [coinId]);

  function pushData() {

    addPrice(cryptoDetails.name, 0, cryptoDetails.price, cryptoDetails.marketCap, cryptoDetails.change, cryptoDetails.iconUrl)
    

  }



  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.priceAt && millify(cryptoDetails?.priceAt)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <>
      {!isFetching ?
        <div style={{ display: "flex", justifyContent: "center" }}>

          <Loader />
        </div>
        :

        <Col className='coin-detail-container' style={{ padding: "50px", width: "100%" }}>
          <Col className='coin-heading-container'>

            <Title level={2} className="coin-name">
              {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
            </Title>
            <div className="div" style={{ display: "flex", marginRight: "5px", justifyContent: "space-between" }}>

              <p style={{ fontWeight: "500" }}>
                {cryptoDetails?.name} live prices in US dollars.
                View value statistics, market cap and supply.
              </p>

              <button type="button" className="btn btn-light btn-sm" onClick={() => { localStorage.getItem('token')? pushData(): showAlert(`Please login-In to add currency in the watchlist`, 'warning','Sorry') }} style={{ marginBottom: "10px", fontWeight: "500" }}>Add to watchlist</button>

            </div>
          </Col>
          <Select
            defaultValue="7d"
            className='select-timeperiod form-control'
            placeholder="Select Time Period"
            onChange={(value) => setTimePeriod(value)}>
            {time.map((date) => <Option key={date}>{date}</Option>)}
          </Select>

          {(isFetching) &&
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />}

          <div className="stats-container row" style={{ display: "flex", justifyContent: "space-between", paddingTop: "2rem" }}>
            <div className='coin-value-statistics-heading' style={{ width: "500px" }}>
              <h3>{cryptoDetails?.name} Value Statistics</h3>
              <p>
                An overview showing the stats of {cryptoDetails?.name}
              </p>
              <ul className="list-group">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ scope: "col" }}>Statistics</th>
                      <th style={{ scope: "col" }}>Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map(({ icon, title, value }) => (
                      <tr>

                        <td style={{ padding: "15px" }}><span style={{ padding: "10px" }}>{icon}</span> <span style={{ padding: "10px 0px 0px 5px" }}>{title}</span></td>
                        <td style={{ padding: "15px" }}>{value !== "undefined" ? value : "Not available"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ul>
            </div>
            <div className='coin-value-statistics-heading' style={{ width: "500px" }}>
              <h3> Other Statistics</h3>
              <p>
                Below are the other stats of {cryptoDetails?.name}
              </p>
              <ul className="list-group">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ scope: "col" }}>Statistics</th>
                      <th style={{ scope: "col" }}>Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genericStats.map(({ icon, title, value }) => (
                      <tr>
                        <td style={{ padding: "15px" }}><span style={{ padding: "10px" }}>{icon}</span> <span style={{ padding: "10px 0px 0px 5px" }}>{title}</span></td>
                        <td style={{ padding: "15px" }}>{value !== "undefined" ? value : "Not available"}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </ul>
            </div>
          </div>
          <Col className='coin-desc-link' style={{ paddingTop: "2rem" }}>
            <Row className='coin-desc'>
              <Title className="coin-details-heading" style={{ textAlign: "justify", fontSize: "1rem" }}>
                <h3>
                  What is {cryptoDetails?.name}?
                </h3>
                {HTMLReactParser(cryptoDesp)}
              </Title>
            </Row>
            <Col className='coin-links'>
              <Title level={3} className="coin-details-heading">
                {cryptoDetails?.name} Links

              </Title>

              <table className='table table-striped' style={{ width: "400px" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoDetails?.links.map((link) => (

                    <tr>

                      <td style={{ fontWeight: "bold", padding: "10px" }}><span style={{ padding: "10px" }}>{link?.type}</span> </td>
                      <td>

                      </td><td>
                      </td><td>
                      </td><td>

                        <a href={link?.url} target="_blank" style={{ color: "black" }}>{link?.name}</a>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </Col>
          </Col>
        </Col>
      }

    </>

  )
}
