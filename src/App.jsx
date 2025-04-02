import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import axios from "axios"
import Navbar from "./components/navbar/Navbar";
import TodoForm from "./components/todoForm/TodoForm";
import TodoTable from "./components/todotable/TodoTable";
import Welcome from "./components/wellCome/Wellcome";
import TicTacToe from "./components/tictactoe/TicTacToe"
import ChatBox from "./components/chatbox/Chatbox";
const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://todo-backend-vzcb.onrender.com/api/todos");
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
      await axios.post('https://todo-backend-vzcb.onrender.com/api/todos', newTodo);
      fetchTodos(); // Fetch updated todos
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = async (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // UI se turant remove
    try {
      await axios.delete(`https://todo-backend-vzcb.onrender.com/api/todos/${id}`);
      fetchTodos(); // Fetch updated todos
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/todo" element={<>
            <TodoForm addTodo={addTodo} />
            <TodoTable todos={todos} onDelete={handleDelete} />
          </>} />
         

          <Route path="/game" element={<TicTacToe />} />
          <Route path="/chat" element={<ChatBox />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
