import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="main-card">
        <div className="home-title">
          <h1>Star Wars Episodes</h1>
        </div>
        <div className="home-buttons">
          <Link to="/create">New character</Link>
          <Link to="/list">Search characters</Link>
          <Link to="/delete">Delete character</Link>
        </div>
      </div>
    </>
  );
};
export default Home;
