import React from "react";
import styles from "./Wellcome.module.css";
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src="/1.png" alt="Profile" className={styles.profileImage} />

        <h1 className={styles.name}>Saurabh Singh</h1>
        <p className={styles.jobTitle}>Software Engineer | Frontend Developer</p>
      </div>

      <div className={styles.section}>
        <h2>About Me</h2>
        <p>I am a passionate front-end developer with experience in React, JavaScript, and MySQL. Currently building projects to enhance my skills.</p>
      </div>

      <div className={styles.section}>
        <h2>Skills</h2>
        <ul className={styles.skillsList}>
          <li>React.js</li>
          <li>JavaScript (ES6+)</li>
          <li>Node.js & Express</li>
          <li>MySQL</li>
          <li>HTML & CSS</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Projects</h2>
        <ul className={styles.projectsList}>
          <li>Social Media App (React, Node.js, MySQL)</li>
          <li><a href="https://bookstore-frontend-green.vercel.app/" style={{ textDecoration: "none", color:"white" }}>Bookstore App</a></li>
          <li>Myntra Clone (Frontend)</li>
          <li> <Link to="/todo" style={{ textDecoration: "none", color: "white" }}>
                To-Do App
               </Link>
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Contact</h2>
        <p>Email: <a className={styles.link} href="mailto:saurabh123mahi@gmail.com">saurabh123mahi@gmail.com</a></p>
        <p>LinkedIn: <a className={styles.link} href="https://linkedin.com/in/singh-saurabh07" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <p>GitHub: <a className={styles.link} href="https://github.com/Saurabh63948" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </div>
    </div>
  );
};

export default Welcome;
