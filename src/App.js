import React from 'react';
import CardDetails from './Components/Pages/CardDetails';
import PinVerification from './Components/Pages/PinVerification';
import Singup from './Components/Pages/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Components/Scss/App.css';
import ErrorPageNotFound from './Components/Pages/ErrorPageNotFound';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<CardDetails />} />
          <Route exact path="/pinverification" element={<PinVerification />} />
          <Route exact path="/Singup" element={<Singup />} />
          <Route exact path="*" element={<ErrorPageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
