import ReviewForm from './pages/ReviewForm';
import HomePage from './pages/HomePage';
import AllApartments from './pages/AllApartmentsPage';
import MainPage from './apartmentdetails/MainPage';
import SearchPage from './pages/SearchPage'
import UserProfile from './pages/UserProfile';
import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import './App.css';


function App() {

  return (
    <Routes>
      <Route path="/:apartment/review" element={<ReviewForm></ReviewForm>}></Route>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/allapartments" element={<AllApartments></AllApartments>}></Route>
      <Route path="/mainpage/:apartment" element={<MainPage></MainPage>}></Route>
      <Route path="/search" element={<SearchPage></SearchPage>}></Route>
      <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
    </Routes>
  );
}

export default App;
