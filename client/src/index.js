import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from "./pages/Layout.jsx";
import Welcome from './pages/Welcome.jsx';
import StudentInitial from './pages/StudentInitial.jsx';
import StudentSimulation from './pages/StudentSimulation.jsx';
import Instructor from './pages/Instructor.jsx';
import Review from './pages/Review.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Welcome/>}/>  
      <Route path="/Home" element={<Welcome/>}/>    
      <Route path="/Review" element={<Review/>}/>
      <Route path="/Student" element={<StudentInitial/>}/>
      <Route path="/Student/*" element={<StudentSimulation/>}/>
      <Route path="/Instructor" element={<Instructor/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
