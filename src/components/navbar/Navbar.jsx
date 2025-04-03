import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  return (
    <>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
        <h2 className={styles.logo}>My Portfolio</h2>

        <button className={styles.themeToggle} onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>

        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</div>

        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/todo" onClick={() => setMenuOpen(false)}>Todo</Link>
          <Link to="/game" onClick={() => setMenuOpen(false)}>Game</Link>
         
          <Link to="/chat" onClick={() => setMenuOpen(false)}>MchatE</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
