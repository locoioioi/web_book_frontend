import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './layouts/header-footer/Navbar';
import { Footer } from './layouts/header-footer/Footer';
import { Homepage } from './layouts/homepage/Hompage';

function App() {
  const [search, setSearch] = useState("")
  return (
    <div>
      <Navbar search={search} setSearch={setSearch}/>
      <Homepage search={search}/>
      <Footer/>
    </div>
  );
}

export default App;
