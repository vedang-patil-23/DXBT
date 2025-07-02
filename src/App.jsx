import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import FooterNav from './components/layout/FooterNav';
import Login from './pages/Login';
import DocumentsPage from './pages/DocumentsPage';
import './App.css';

import MoneyInLuxIcon from './assets/icons/moneyin-lux.svg';
import MoneyIn from './components/Finance/MoneyIn';
import MoneyOut from './components/Finance/MoneyOut';
import './components/Finance/MoneyIn.css';
import logo from './assets/logo.png';
import MoneyOutLuxIcon from './assets/icons/moneyout-lux.svg';
import MoneyLeftLuxIcon from './assets/icons/moneyleft-lux.svg';
import ExchangeLuxIcon from './assets/icons/exchange-lux.svg';
import DocumentsLuxIcon from './assets/icons/documents-lux.svg';

function AnimatedNumber({ value, duration = 900, prefix = '', suffix = '' }) {
  const ref = useRef();
  useLayoutEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      ref.current.innerText = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value, prefix, suffix, duration]);
  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

function HomePage({ moneyLeft, totalIn, totalOut, conversionRate }) {
  const navigate = useNavigate();
  // Example: show badge if Money In grew 12%
  const moneyInGrowth = 12; // fake value for demo
  return (
    <div className="dxbt-home-root luxury-bg">
      <div className="dxbt-bg-watermark">DXBT</div>
      <header className="dxbt-home-header luxury-title">
        <img src={logo} alt="DXBT Logo" style={{maxWidth: '350px', width: '100%', display: 'block', margin: '0 auto 1.2em auto', padding: '0 6vw'}} />
      </header>
      <div className="dxbt-home-cards luxury-cards luxury-grid-5">
        <div className="dxbt-home-card money-in luxury-pill glass" onClick={() => navigate('/money-in')}>
          <img src={MoneyInLuxIcon} alt="Money In (luxury)" className="dxbt-home-card-icon" />
          <div className="dxbt-home-card-label">Money In</div>
          <div className="dxbt-home-card-value">
            ₹ {totalIn.toLocaleString()}
          </div>
        </div>
        <div className="dxbt-home-card money-out luxury-pill glass" onClick={() => navigate('/money-out')}>
          <img src={MoneyOutLuxIcon} alt="Money Out (luxury)" className="dxbt-home-card-icon" />
          <div className="dxbt-home-card-label">Money Out</div>
          <div className="dxbt-home-card-value">
            ₹ {totalOut.toLocaleString()}
          </div>
        </div>
        <div className="dxbt-home-card glass money-left luxury-card-large" onClick={() => navigate('/')}> 
          <img src={MoneyLeftLuxIcon} alt="Money Left (luxury)" className="dxbt-home-card-icon" />
          <div className="dxbt-home-card-label">Money Left</div>
          <div className="dxbt-home-card-value">
            <AnimatedNumber value={moneyLeft} prefix="₹ " />
          </div>
        </div>
        <div className="dxbt-home-card glass exchange-rate luxury-pill" onClick={() => navigate('/exchange')}>
          <img src={ExchangeLuxIcon} alt="Exchange Rate (luxury)" className="dxbt-home-card-icon" />
          <div className="dxbt-home-card-label">Exchange Rate</div>
          <div className="dxbt-home-card-value">1 AED = ₹{conversionRate}</div>
        </div>
        <div className="dxbt-home-card glass documents luxury-pill">
          <img src={DocumentsLuxIcon} alt="Documents (luxury)" className="dxbt-home-card-icon" />
          <div className="dxbt-home-card-label">Documents</div>
          <div className="dxbt-home-card-value"><h5>All Travel Docs</h5></div>
        </div>
      </div>

    </div>
  );
}


function MoneyInPage() {
  return <div className="dxbt-page-placeholder">Money In (Coming Soon)</div>;
}
function MoneyOutPage({ moneyOutList, setMoneyOutList, conversionRate }) {
  return (
    <MoneyOut 
      moneyOutList={moneyOutList} 
      setMoneyOutList={setMoneyOutList} 
      conversionRate={conversionRate}
    />
  );
}
function ExchangePage() {
  return <div className="dxbt-page-placeholder">Exchange Rate (Coming Soon)</div>;
}
function NotFoundPage() {
  return <div className="dxbt-page-placeholder">Page Not Found</div>;
}

function App() {
  // Transaction state and persistence
  // Declare state hooks first!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moneyInList, setMoneyInList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dxbt_moneyin')) || [];
    } catch {
      return [];
    }
  });
  const [moneyOutList, setMoneyOutList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dxbt_moneyout')) || [];
    } catch {
      return [];
    }
  });
  const [conversionRate, setConversionRate] = useState(() => {
    const rate = localStorage.getItem('dxbt_conversionrate');
    return rate ? parseFloat(rate) : 23.58;
  });

  // Calculate totals based on moneyInList and moneyOutList
  const totalIn = moneyInList.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
  const totalOut = moneyOutList.reduce((sum, item) => sum + (item.currency === 'AED' ? item.amount * conversionRate : item.amount), 0);
  const moneyLeft = totalIn - totalOut;

  // Debug: log moneyOutList changes
  useEffect(() => {
    console.log('moneyOutList updated:', moneyOutList);
  }, [moneyOutList]);


  useEffect(() => {
    // Check localStorage for session
    const loggedIn = localStorage.getItem('dxbt_logged_in');
    if (loggedIn === 'true') setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('dxbt_moneyin', JSON.stringify(moneyInList));
  }, [moneyInList]);
  useEffect(() => {
    localStorage.setItem('dxbt_moneyout', JSON.stringify(moneyOutList));
  }, [moneyOutList]);
  useEffect(() => {
    localStorage.setItem('dxbt_conversionrate', conversionRate);
  }, [conversionRate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('dxbt_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('dxbt_logged_in');
  };



  return (
    <div className="dxbt-app-root">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <BrowserRouter>
          <div className="dxbt-router-shell">
            <Routes>
              <Route path="/" element={<HomePage moneyLeft={moneyLeft} totalIn={totalIn} totalOut={totalOut} conversionRate={conversionRate} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/money-in" element={<MoneyIn transactions={moneyInList} setTransactions={setMoneyInList} />} />
              <Route
  path="/money-out"
  element={
    <MoneyOutPage
      moneyOutList={moneyOutList}
      setMoneyOutList={setMoneyOutList}
      conversionRate={conversionRate}
    />
  }
/>
              <Route path="/exchange" element={<ExchangePage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <FooterNav onLogout={handleLogout} />
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}


export default App;
