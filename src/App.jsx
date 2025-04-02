import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import axios from "axios"
import Navbar from "./components/navbar/Navbar";
import TodoForm from "./components/todoForm/TodoForm";
import TodoTable from "./components/todotable/TodoTable";
import Welcome from "./components/wellCome/Wellcome";
import TicTacToe from "./components/tictactoe/TicTacToe"
const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('https://todo-backend-vzcb.onrender.com/api/todos', newTodo);
      setTodos([...todos, response.data]); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  
  const handleDelete= async(id)=>{
    try{
      await axios.delete(`https://todo-backend-vzcb.onrender.com/api/todos/${id}`)

      setTodos(todos.filter((todo)=>todo._id !==id));
    }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    
    const fetchTodos = async () =>{
   
      try{
       const response= await axios.get("https://todo-backend-vzcb.onrender.com/api/todos")
         setTodos(response.data)
      }
       catch(error){
           console.log(error)
       }
    }

   fetchTodos();

  },[])






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
