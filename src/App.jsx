import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Navbar from "./components/navbar/Navbar";
import TodoForm from "./components/todoForm/TodoForm";
import TodoTable from "./components/todotable/TodoTable";
import Welcome from "./components/wellCome/Wellcome";
import TicTacToe from "./components/tictactoe/TicTacToe"
const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };
  const handleDelete=(index)=>{
    setTodos((prev)=>prev.filter((_,i)=> i!==index))
  }



  return (
    <Router> {/* ✅ React Router Wrap */}
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/todo" element={<>
            <TodoForm addTodo={addTodo} />
            <TodoTable todos={todos} onDelete={handleDelete} />
          </>} />
          <Route path="/game" element={<TicTacToe/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
