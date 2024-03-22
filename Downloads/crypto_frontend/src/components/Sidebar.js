import React, { useState, useEffect } from 'react';
import {Menu, Typography, Avatar } from 'antd';
import { Link} from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, QuestionCircleOutlined, SettingOutlined, StarOutlined, EyeOutlined, StockOutlined} from '@ant-design/icons';
import icon from '../img/bitcoin_1.png';

export default function Sidebar() {

    
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);
    return (
        <>

            
                <div className="nav-container " style={{height:"100vh"}}>
                    <div className="logo-container" style={{display:"flex", alignItems:"center",marginTop:"10px"}}>
                        <Avatar src={icon} size="medium" />
                        <Typography.Title level={4} className="logo" style={{paddingTop:"9px",paddingLeft:"10px"}}><Link to="/">Cryptocompass</Link></Typography.Title>
                        {/* <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button> */}
                    </div>
                    <Menu theme="dark" style={{marginTop:"15px"}}>
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        
                        <Menu.Item icon={<FundOutlined />}>
                            <Link to="/cryptocurrency">Cryptocurrencies</Link>
                        </Menu.Item>

                        <Menu.Item icon={<BulbOutlined />}>
                            <Link to="/news">News</Link>
                        </Menu.Item>

                        <Menu.Item icon={<EyeOutlined />}>
                            <Link to="/cryptocurrency/watchlist">Watchlist</Link>
                        </Menu.Item>

                        <Menu.Item icon={<StockOutlined />}>
                            <Link to="/trading">Trading</Link>
                        </Menu.Item>
                        
                        <Menu.Item icon={<SettingOutlined />}>
                           
                            <Link to="/settings">Settings</Link>
                        </Menu.Item>
                        
                        <Menu.Item icon={<QuestionCircleOutlined />}>
                            <Link to="/support">Help and support</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            
        </>


    )
}
