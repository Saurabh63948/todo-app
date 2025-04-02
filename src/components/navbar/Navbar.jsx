import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ Overlay (Jab Menu Open Ho) */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}

      <nav className={styles.navbar}>
        <h2 className={styles.logo}>My Portfolio</h2>

        {/* ✅ Hamburger Button */}
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* ✅ Navigation Links (Sidebar Style) */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/todo" onClick={() => setMenuOpen(false)}>Todo</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/game" onClick={() => setMenuOpen(false)}>Game</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

