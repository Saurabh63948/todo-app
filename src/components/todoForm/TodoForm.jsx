import React, { useState } from 'react';
import styles from './TodoForm.module.css'; // ✅ Correct Import

const TodoForm = ({ addTodo }) => {
  const [todoName, setTodoName] = useState('');
  const [todoDate, setTodoDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent adding empty spaces
    if (!todoName.trim() || !todoDate) {
      return alert('⚠️ Please fill in both the todo name and date.');
    }

    const newTodo = { todoName: todoName.trim(), todoDate };
    addTodo(newTodo);
    
    // Clear input fields after submission
    setTodoName('');
    setTodoDate('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1 className={styles.title}>📝 ADD YOUR TODO HERE!</h1>

      <input
        type="text"
        value={todoName}
        placeholder="Enter your todo here..."
        onChange={(e) => setTodoName(e.target.value)}
        className={styles.inputField}
        autoFocus
      />
      
      <input
        type="date"
        value={todoDate}
        onChange={(e) => setTodoDate(e.target.value)}
        className={styles.inputField}
      />
      
      <button type="submit" className={styles.submitButton}>➕ ADD</button>
    </form>
  );
};

export default TodoForm;
