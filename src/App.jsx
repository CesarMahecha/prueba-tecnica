// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default App;