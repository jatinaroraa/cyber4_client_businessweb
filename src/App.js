import React from 'react'
import CoursePlatform from './Cyber4'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ATSScoreChecker from './AtsChecker';
import Login from './Dashboard/Login';

export default function App() {
  return (
     <Router>
      <Routes>
         <Route path="/" element={<CoursePlatform />} />
         <Route path="/checkats" element={<ATSScoreChecker />} />
       <Route path="/login" element={<Login />} />
      </Routes>
      </Router>

  )
}
