import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import icon from "../img/bitcoin.png";
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

export default function News({ simplified }) {

  const { Text, Title } = Typography;
  const { Option } = Select;

  const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery()

  console.log(cryptoNews)
  if (!cryptoNews?.data) return <div style={{ display: "flex", justifyContent: "center" }}>

    <Loader />
  </div>;


  const demoimage = icon;

  return (

    <Row gutter={[24, 24]} style={{ padding: "20px" }}>
      {
        !simplified &&
        <Col span={24}>
          <Select
            showSearch
            className='select-news form-control me-2'
            placeholder="Select a news category"
            optionFilterProp='children'
            onChange={(value) => setnewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

          </Select>
        </Col>
      }

      {cryptoNews.data.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>

          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container" style={{ display: "flex" }}>
                <Title className="news-title" level={4}>{news.title} </Title>
                <img src={news?.thumbnail?.contentUrl || demoimage} alt="news" style={{ height: "100px", width: "130px", margin: "15px" }} />
              </div>
              <p style={{ color: "black", padding: "10px 10px 10px 0px" }}>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description
                }
              </p>
              <div className="provider-container">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoimage} alt="news" />
                  <Text className='provider-name' style={{paddingLeft:"5px"}}>{news.provider[0]?.name}</Text> */}
                  <Text style={{ position: 'absolute', right: "10px" }}>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                </div>
              </div>
            </a>

          </Card>
        </Col>


      ))}
    </Row>
  )
}
