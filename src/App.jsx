// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CharacterTable from './CharacterTable';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/characters" element={<CharacterTable />} />
      </Routes>
  );
}

export default App;