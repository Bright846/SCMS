import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../../SCMS/src/Components/Header/NavBar/navbar'
import Main from '../../SCMS/src/Components/Main/main'
import Footer from '../../SCMS/src/Components/Footer/footer'
import About from '../About/aboutPage';
import FaqPage from '../faq/coreFaq';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about-page' element={<About />} />
        <Route path='/faq-page' element={<FaqPage />} />
      </Routes >
      <Footer />
    </>
  )
}

export default App
