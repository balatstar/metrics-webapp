import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import previous from './images/previous.png';
import home from './images/home.png';

function Navbar() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <header>
      <div className="nav-back" onClick={goBack}><img src={previous} /></div>
      <h1>UK Carbon Intensity Indicator</h1>
      <div className="nav-home"><Link to='/'><img src={home} /></Link></div>
    </header>
  );
}
export default Navbar;
