import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';  //file sender
import Canvas from './Canvas.js'; //display drawer
import UserInput2 from "./UserInput2.js"; //local storagw
import Navbar from './Navbar.js'; //student selector


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Navbar/>
    <App /> 
    <Canvas />
    <UserInput2/>
 </div>
);

 // <React.StrictMode>  </React.StrictMode>
