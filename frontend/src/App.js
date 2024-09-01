import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BusList from './components/BusList';
import Navigation from './components/Navigation';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<BusList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

