import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import CoinPgae from './Pages/CoinPgae';
import Home from './Pages/Home';
import './App.css'
import Practice from './Pages/Practice';

const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Practice" element={<Practice />} />
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinPgae />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
