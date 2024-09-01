import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BusList from './components/BusList';
import Navigation from './components/Navigation';
import PlanJourney from './components/PlanJourney';
import RouteMap from './components/RouteMap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<BusList />} />
          <Route path="/plan-journey" element={<PlanJourney />} />
          <Route path="/route-map" element={<RouteMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



