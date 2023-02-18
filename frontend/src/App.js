import ReviewForm from './ReviewForm';
import SubmissionForm from './SubmissionForm';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AllApartments from './AllApartments';
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
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/allapartments" element={<AllApartments></AllApartments>}></Route>
      <Route path="/mainpage" element={<MainPage></MainPage>}></Route>
    </Routes>
  );
}

export default App;
