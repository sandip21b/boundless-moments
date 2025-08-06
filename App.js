import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/Adminpanel";
import './App.css'; // Add this CSS import

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Boundless Moments</div>
      <ul>
        <li>
          <Link className={location.pathname === "/" ? "active" : ""} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/skills" ? "active" : ""} to="/skills">
            Skills
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/gallery" ? "active" : ""} to="/gallery">
            Gallery
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
