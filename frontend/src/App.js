import ReviewForm from './pages/ReviewForm';
import SubmissionForm from './SubmissionForm';
import HomePage from './pages/HomePage';
import AllApartments from './pages/AllApartmentsPage';
import MainPage from './apartmentdetails/MainPage';
import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";
//import UserProvider from "./provider"
import './App.css';


function App() {

  // const queryParameters = new URLSearchParams(window.location.search);
  //   if (queryParameters.has("apartment")) {
	//     apartment = queryParameters.get("apartment");
  //   }

  return (
    <Routes>
      <Route path="/:apartment/review" element={<ReviewForm></ReviewForm>}></Route>
      <Route path="/SubmissionForm" element={<SubmissionForm></SubmissionForm>}></Route>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/allapartments" element={<AllApartments></AllApartments>}></Route>
      <Route path="/mainpage/:apartment" element={<MainPage></MainPage>}></Route>
    </Routes>
  );
}

export default App;
