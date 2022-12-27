import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import CoinPgae from './Pages/CoinPgae';
import Home from './Pages/Home';
import './App.css';
import SignInPage from './Pages/SignInPage';
import SingUpPage from './Pages/SingUpPage';


const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Header />
        <div>
        <Routes>
          <Route path="/trading" element={<h1>Trading Here</h1>} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SingUpPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinPgae />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
