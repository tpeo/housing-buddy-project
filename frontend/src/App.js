import Apartments from './Apartments';
import SubmissionForm from './SubmissionForm';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Apartments></Apartments>}></Route>
      <Route path="/SubmissionForm" element={<SubmissionForm></SubmissionForm>}></Route>
    </Routes>
  );
}

export default App;
