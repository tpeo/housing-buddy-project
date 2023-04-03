import ReviewForm from './pages/ReviewForm';
import HomePage from './pages/HomePage';
import FAQ from './pages/FAQ';
import AllApartments from './pages/AllApartmentsPage';
import MainPage from './apartmentdetails/MainPage';
import SearchPage from './pages/SearchPage'
import UserProfile from './pages/UserProfile';
import ApartmentComparisonPage from './pages/ApartmentComparisonPage';
import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import './App.css';
import AboutUs from './pages/AboutUs';
import { Typography } from '@mui/material';

const ProtectedFormRoute = ({isLoggedIn, children}) => {
  const params = useParams();
  const name = params.apartment;
  if (isLoggedIn && window.localStorage.getItem("@apartment") === name) {
    console.log(params)
    return children;
  } else {
    return (
    <Typography variant='body'>Error 404. You are not authorized to access this page</Typography>
    );
  }
}

function App() {

  return (
    <Routes>
      <Route path="/:apartment/review" element={
        <ProtectedFormRoute isLoggedIn={window.localStorage.getItem("loggedIn")}>
          <ReviewForm></ReviewForm>
        </ProtectedFormRoute>
        }></Route>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/allapartments" element={<AllApartments></AllApartments>}></Route>
      <Route path="/mainpage/:apartment" element={<MainPage/>}></Route>
      <Route path="/search" element={<SearchPage></SearchPage>}></Route>
      <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
      <Route path="/compare" element={<ApartmentComparisonPage></ApartmentComparisonPage>}></Route>
      <Route path="/faq" element={<FAQ/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
    </Routes>
  );
}

export default App;
