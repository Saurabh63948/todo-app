// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import axios from "axios";
import Navbar from "./components/navbar/Navbar";
import TodoForm from "./components/todoForm/TodoForm";
import TodoTable from "./components/todotable/TodoTable";
import Welcome from "./components/wellCome/Wellcome";
import TicTacToe from "./components/tictactoe/TicTacToe";
import ChatBox from "./components/chatbox/ChatBox";
import { ThemeProvider } from "./components/context/ThemeContext";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://todo-backend-vzcb.onrender.com/api/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      await axios.post(
        "https://todo-backend-vzcb.onrender.com/api/todos",
        newTodo
      );
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://todo-backend-vzcb.onrender.com/api/todos/${id}`
      );
      fetchTodos();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        
        {/* Main Content - Add padding-top equal to navbar height */}
        <div style={{ 
          paddingTop: "80px",
         
          background: "var(--bg)",
          color: "var(--text)",
          transition: "background 0.3s ease, color 0.3s ease"
        }}>
          <Routes>
            <Route path="/" element={<Welcome />} />

            <Route
              path="/todo"
              element={
                <div style={{ 
                  padding: "20px",
                  maxWidth: "1200px",
                  margin: "0 auto"
                }}>
                  <TodoForm addTodo={addTodo} />
                  <TodoTable todos={todos} onDelete={handleDelete} />
                </div>
              }
            />

            <Route path="/game" element={<TicTacToe />} />
            <Route path="/chat" element={<ChatBox />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;