import React from "react";
import styles from "./Wellcome.module.css"

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
      <img  src="/1.png" alt="Profile" className={styles.profileImage} />

        <h1>Saurabh Singh</h1>
        <p>Software Engineer | Frontend Developer</p>
      </div>

      <div className={styles.section}>
        <h2>About Me</h2>
        <p>I am a passionate front-end developer with experience in React, JavaScript, and MySQL. Currently building projects to enhance my skills.</p>
      </div>

      <div className={styles.section}>
        <h2>Skills</h2>
        <ul>
          <li>React.js</li>
          <li>JavaScript (ES6+)</li>
          <li>Node.js & Express</li>
          <li>MySQL</li>
          <li>HTML & CSS</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Projects</h2>
        <ul>
          <li>Social Media App (React, Node.js, MySQL)</li>
          <li>Bookstore App</li>
          <li>Myntra Clone (Frontend)</li>
          <li>To-Do App</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Contact</h2>
          <p>Email: <a href="mailto:saurabh123mahi@gmail.com">Email</a></p>
         <p>LinkedIn: <a href="https://linkedin.com/in/singh-saurabh07" target="_blank" rel="noopener noreferrer">linkedin.</a></p>
          <p>GitHub: <a href="https://github.com/Saurabh63948" target="_blank" rel="noopener noreferrer">github.com/Saurabh63948</a></p>
      </div>
    </div>
  );
};

export default Welcome;
