import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./ChatBox.module.css";
import { useTheme } from "../context/ThemeContext"; // Add import

const socket = io("https://todo-backend-vzcb.onrender.com");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const { darkMode } = useTheme(); // Use theme context

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isUsernameSet) {
    return (
      <div className={styles.chatContainer} style={{ 
        background: darkMode ? "var(--bg-dark)" : "var(--bg-light)",
        color: darkMode ? "var(--text-light)" : "var(--text-dark)"
      }}>
        <div className={styles.chatHeader} style={{ 
          background: darkMode ? "#1a365d" : "#3498db"
        }}>
          Enter Your Name
        </div>
        <div className={styles.chatInputContainer} style={{ 
          background: darkMode ? "#2a2a2a" : "white",
          borderTop: darkMode ? "1px solid #555" : "1px solid #ccc"
        }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className={styles.chatInput}
            style={{ 
              background: darkMode ? "#333" : "white",
              color: darkMode ? "white" : "#333",
              border: darkMode ? "1px solid #555" : "1px solid #ccc"
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && username.trim() !== "") {
                setIsUsernameSet(true);
              }
            }}
          />
          <button
            onClick={() => {
              if (username.trim() !== "") setIsUsernameSet(true);
            }}
            className={styles.sendButton}
            style={{ 
              background: darkMode ? "#1e88e5" : "#2980b9"
            }}
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer} style={{ 
      background: darkMode ? "var(--bg-dark)" : "var(--bg-light)",
      color: darkMode ? "var(--text-light)" : "var(--text-dark)"
    }}>
      <div className={styles.chatHeader} style={{ 
        background: darkMode ? "#1a365d" : "#3498db"
      }}>
        Chat as <strong>{username}</strong>
      </div>

      <div className={styles.chatMessages} style={{ 
        background: darkMode ? "#252525" : "#f9f9f9"
      }}>
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

      <div className={styles.chatInputContainer} style={{ 
        background: darkMode ? "#2a2a2a" : "white",
        borderTop: darkMode ? "1px solid #555" : "1px solid #ccc"
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className={styles.chatInput}
          style={{ 
            background: darkMode ? "#333" : "white",
            color: darkMode ? "white" : "#333",
            border: darkMode ? "1px solid #555" : "1px solid #ccc"
          }}
        />
        <button 
          onClick={sendMessage} 
          className={styles.sendButton}
          style={{ 
            background: darkMode ? "#1e88e5" : "#2980b9"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;