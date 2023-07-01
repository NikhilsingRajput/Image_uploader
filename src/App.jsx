import React from 'react';
import  { BrowserRouter ,Route, Routes } from 'react-router-dom'

import Login from './components/login';
import Profile from './components/Profile';
import Logout from './components/logout';
import Register from './components/Register';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/Signup" element={<Register />}/>
    <Route path="/home" element={<Profile />}/>
    <Route path="/Logout" element={<Logout />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
