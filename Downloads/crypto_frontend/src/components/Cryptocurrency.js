import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Row, Col } from 'antd';
import Loader from './Loader';
import priceContext from '../context/PriceContext';
import { useContext } from 'react';


export default function Cryptocurrency({ simplified }) {
  const context = useContext(priceContext);
  const { showAlert, addPrice } = context;

  const count = simplified ? 10 : 100;

  const { data, isFetching } = useGetCryptosQuery(count);
  
  const [cryptos, setCryptos] = useState(data?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('')
  const [coinId, setcoinId] = useState(' ')

  useEffect(() => {
    setCryptos(data?.data?.coins)

    const filteredData = data?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);


  }, [data, searchTerm])



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
              
        addPrice(cryptoDetail.name, 0, cryptoDetail.price, cryptoDetail.marketCap, cryptoDetail.change, cryptoDetail.iconUrl)
        
        return data;

      }
      fetching();
  
  }, [coinId])

  if (isFetching) return <div style={{ display: "flex", justifyContent: "center" }}>

    <Loader />
  </div>;

  return (
    <>
      {
        !simplified &&
        <div className='search-crypto container' style={{ width: "250px", margin: "auto", margin: "20px 20px 0px 10px" }}>
          <input className="form-control me-2" type="search" placeholder="Search cryptocurrency here" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      }

      <Row gutter={[32, 32]} className="crypto-card-container" style={{ padding: "20px" }}>
        {cryptos?.map((currency) => (

          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.rank}>
            <Link to={`/cryptocurrency/${currency.uuid}`}>

              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} style={{ height: "23px", width: "23px" }} alt="Nothing" />}
                hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>

              </Card>


            </Link>
                <button type="button" class="btn btn-light btn-sm" onClick={() => { localStorage.getItem('token')? setcoinId( currency.uuid): showAlert(`Please login-In to add currency in the watchlist`, 'warning','Sorry') }} style={{marginTop:"10px",fontWeight:"500"}}>Add to watchlist</button>
           
          </Col>

        ))}

      </Row>
    </>
  )
}
