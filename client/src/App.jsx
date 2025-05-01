import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Make sure this line is here
import LandingPage from './pages/LandingPage'
const App = () => {
  return (
    <Router>
      <LandingPage />
    </Router>
  );
}

export default App;
