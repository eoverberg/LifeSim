import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App.js';  //file sender
import Canvas from './Canvas.js'; //display drawer
import UserInput2 from "./UserInput2.js"; //local storagw
import Navbar from './Navbar.js'; //student selector
import Layout from "./pages/Layout.js";
import Logon from "./pages/Logon.js";
import Student from './pages/Student.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Logon/>}/>
      <Route path="*" element={<Student/>}/>
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

