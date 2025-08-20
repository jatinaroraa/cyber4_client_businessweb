import React from 'react'
import CoursePlatform from './Cyber4'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ATSScoreChecker from './AtsChecker';

export default function App() {
  return (
     <Router>
      <Routes>
         <Route path="/" element={<CoursePlatform />} />
         <Route path="/checkats" element={<ATSScoreChecker />} />

      </Routes>
      </Router>

  )
}
