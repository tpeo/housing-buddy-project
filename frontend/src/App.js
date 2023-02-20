import ReviewForm from './pages/ReviewForm';
import SubmissionForm from './SubmissionForm';
import HomePage from './pages/HomePage';
import AllApartments from './pages/AllApartmentsPage';
import MainPage from './apartmentdetails/MainPage';
import React from 'react';
import { Routes, Route } from "react-router-dom";
//import UserProvider from "./provider"
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/review" element={<ReviewForm></ReviewForm>}></Route>
      <Route path="/SubmissionForm" element={<SubmissionForm></SubmissionForm>}></Route>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/allapartments" element={<AllApartments></AllApartments>}></Route>
      <Route path="/mainpage" element={<MainPage></MainPage>}></Route>
    </Routes>
  );
}

export default App;
