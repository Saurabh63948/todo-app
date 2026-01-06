import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { CiDark, CiSun } from "react-icons/ci";
import { useTheme } from "../context/ThemeContext"; // Add this import

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme(); // Use context

  return (
    <>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
        <Link to="/" className={styles.logo}>
          <h2>My Portfolio</h2>
        </Link>

        <button className={styles.themeToggle} onClick={toggleDarkMode}>
          {darkMode ? <CiSun size={24} /> : <CiDark size={24} />}
        </button>

        <div 
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

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