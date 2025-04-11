import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./ChatBox.module.css";

const socket = io("https://todo-backend-vzcb.onrender.com"); // ✅ Your backend URL

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, sender: username };
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      setInput("");
    }
  };

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  // 👉 Username input UI
  if (!isUsernameSet) {
    return (
      <div className={`${styles.chatContainer} ${darkMode ? styles.dark : ""}`}>
        <div className={styles.chatHeader}>
          Enter Your Name
          <button className={styles.themeToggle} onClick={toggleDarkMode}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
        <div className={styles.chatInputContainer}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className={styles.chatInput}
          />
          <button
            onClick={() => {
              if (username.trim() !== "") setIsUsernameSet(true);
            }}
            className={styles.sendButton}
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.chatContainer} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.chatHeader}>
        Chat as <strong>{username}</strong>
        <button className={styles.themeToggle} onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === username ? styles.myMessage : styles.otherMessage
            }`}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className={styles.chatInputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.chatInput}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
