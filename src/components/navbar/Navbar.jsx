import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; // ✅ Ensure Correct Import

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h2>My Portfolio</h2>
      <div className={styles.navLinks}> {/* ✅ Correct Class Name */}
        <Link to="/">Home</Link>
        <Link to="/todo">Todo</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;


