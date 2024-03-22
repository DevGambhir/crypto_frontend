import React, {useEffect} from 'react'
import millify from 'millify';
import {Link} from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrency from './Cryptocurrency';
import News from './News';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import priceContext from '../context/PriceContext';
import { useContext } from 'react';



export default function Home() {

    const navigate = useNavigate();
    const context = useContext(priceContext);
    const {getPrice, showAlert} = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            
            getPrice();
           
        }
        else{
            navigate('/login')
            // showAlert(`Please login-in or Sign-up`, 'warning','Sorry')
        }
    },[])

    const { data, isFetching} = useGetCryptosQuery(10);
    
    const globalStats = data?.data?.stats;

    if(isFetching) return <div style={{display:"flex",justifyContent:"center"}}>
      
    <Loader/>
  </div>;

  return (
    <>


    <div className='sidebar_container'>
        <div className="home_content">
            <h2 style={{padding:"10px 0px 0px 20px"}}>Global Crypto Stats</h2>
        </div>
        <div className="row container">
            <div className="col-4" style={{margin:"10px"}}>
                <h6>Total Cryptocurrencies</h6>
                <h4>{globalStats.total}</h4>
                <br />
                <h6>Total Market Cap</h6>
                <h4>{millify(globalStats.totalMarketCap)}</h4>
                <br />
                <h6>Total Markets</h6>
                <h4>{millify(globalStats.totalMarkets)}</h4>
                <br />
            </div>
            <div className="col-4" style={{margin:"10px"}}>
                <h6>Total Exchanges</h6>
                <h4>{millify(globalStats.totalExchanges)}</h4>
                <br />
                
                <h6>Total 24h Volume</h6>
                <h4>{millify(globalStats.total24hVolume)}</h4>
                <br />
            </div>
        </div>
        <div className="container home_heading" style={{display:"flex",alignItems:"center", justifyContent:"space-between",padding:"0px 20px"}}>
            <h4>Top 10 Cryptocurrencies in the world</h4>
            <Link to='/cryptocurrency'style={{textDecoration:"none"}}>
             <h6>
                Show More
             </h6>
             </Link>

        </div>

        <Cryptocurrency simplified={true}/>
        
        <div className="container home_heading" style={{display:"flex",alignItems:"center", justifyContent:"space-between",marginTop:"20px",padding:"0px 20px"}}>
            <h4>Latest Crypto News</h4>
            <Link to='/news'style={{textDecoration:"none"}}>
             <h6>
                Show More
             </h6>
             </Link>

        </div>
        <News simplified={true}/>

        <div className="settings">
            <h2 style={{padding:"10px 0px 0px 20px"}}></h2>
        </div>

      
    </div>
    </>
  )
}
