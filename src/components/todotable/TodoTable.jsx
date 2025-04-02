import React, { useState } from 'react';
import styles from './TodoTable.module.css'; 
import { use } from 'react';

const TodoTable = ({ todos,onDelete }) => {

  



  return (
    <div className={styles.tableContainer}>
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
            <tr key={index}>
              <td>{todo.todoName}</td>
              <td>{todo.todoDate}</td>
              <td>
                <button className={styles.deleteButton} onClick={()=>onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
