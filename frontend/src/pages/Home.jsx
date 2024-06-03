import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  return (
    <div className='home'>
      <h1>Welcome to the PDF Book Generator</h1>
      <button className='btn1'> <Link to="/create" style={{textDecoration:"none"}}>Create a new PDF Book</Link> </button><br />
     <button className='btn2'>  <Link to="/admin" style={{textDecoration:"none"}}>Admin</Link></button>
    </div>
  );
};

export default Home;
