import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import View360 from './View360';
import AboutPage from './AboutPage';

function AppRoutes() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<LandingPage onViewTour={() => navigate('/tour')} />} />
      <Route path="/tour" element={<View360 />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
