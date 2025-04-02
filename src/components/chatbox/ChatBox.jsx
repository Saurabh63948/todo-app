import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./ChatBox.module.css";

const socket = io("http://localhost:5000"); // ✅ Backend ka URL

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );
  const messagesEndRef = useRef(null); // ✅ Auto-scroll ke liye

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
      const newMessage = { text: input, sender: "You" };
      setMessages([...messages, newMessage]);
      socket.emit("sendMessage", newMessage);
      setInput("");
    }
  };

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  return (
    <div className={`${styles.chatContainer} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.chatHeader}>
        Chat with Friends
        <button className={styles.themeToggle} onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
      
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "You" ? styles.myMessage : styles.otherMessage
            }`}
          >
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div> {/* ✅ Auto-scroll ke liye */}
      </div>
      
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.chatInput}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
