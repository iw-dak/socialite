import React from "react";
import TodoItemContainer from "./TodoItemContainer";

const TodoList = ({ todos }) =>
  <React.Fragment>
    {/* <TodoFormContainer /> */}
    <ul>
      {todos.map((todo, index) => (
        <TodoItemContainer key={index} todo={todo} />
      ))}
    </ul>
  </React.Fragment>

export default TodoList;
