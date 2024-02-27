import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import Layout from "./pages/Layout.js";
import Logon from "./pages/Logon.js";
import Student from './pages/Student.js';
import StudentSim from './pages/StudentSim.js';
import Instructor from './pages/Instructor.js';
import Review from './pages/Review.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Logon/>}/>
      <Route path="/Instructor" element={<Instructor/>}/>
      <Route path="/Review" element={<Review/>}/>
      <Route path="/Student" element={<Student/>}>
      </Route>
      <Route path="/Student/*" element={<StudentSim/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


/*
        
<Navbar/>
    <App /> 
    <Canvas />
    <UserInput2/>
*/


