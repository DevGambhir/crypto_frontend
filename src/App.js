import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Cryptocurrency from './components/Cryptocurrency';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News';
import Home from './components/Home';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import PriceState from './context/PriceState';
import Login from './components/Login';
import Signup from './components/Signup';
import Watchlist from './components/Watchlist';
import Footer from './components/Footer';
import Settings from './components/Settings';
import HelpAndSupport from './components/Help and support';



function App() {


  return (
    <PriceState>
      <BrowserRouter>
        <Layout style={{ display: "flex", flexDirection: "row", position: "relative", minHeight: "100vh" }}>
          <Sider className="sidebar">
            <Sidebar />
          </Sider>
          <Layout style={{ paddingBottom: "15rem" }}>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/"
                  element={<><Home /></>} />
                <Route path="/cryptocurrency"
                  element={<><Cryptocurrency /></>} />
                <Route path="/news"
                  element={<><News /></>} />
                <Route path="/settings"
                  element={<><Settings /></>} />
                <Route path="/cryptocurrency/:coinId"
                  element={<><CryptoDetails /></>} />
                <Route path="/login"
                  element={<><Login /></>} />
                <Route path="/signup"
                  element={<><Signup /></>} />
                <Route path="/cryptocurrency/watchlist"
                  element={<><Watchlist /></>} />
                <Route path="/support"
                  element={<><HelpAndSupport/></>} />

              </Routes>
              <Footer />
            </div>
          </Layout>
        </Layout>
      </BrowserRouter>
    </PriceState>
  );
}

export default App;
