import React from 'react';
import styles from './TodoTable.module.css'; 

const TodoTable = ({ todos, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      {todos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No todos yet. Add your first todo!</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Todo-List</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo._id || index}>
                <td>{todo.todoName}</td>
                <td>{new Date(todo.todoDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => onDelete(todo._id)}
                    aria-label={`Delete ${todo.todoName}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoTable;