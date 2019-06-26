import React from "react";
import TodoItemActions from "./TodoItemActions";

class TodoItem extends React.Component {
  render() {
    return (
      <li
        style={{ opacity: this.props.todo.checked ? 0.5 : 1 }}
      >
        {this.props.todo.text}

        <TodoItemActions
            onComplete={() => this.props.onCheck(this.props.todo)}
            onDelete={() => this.props.onDelete(this.props.todo)} />
      </li>
    );
  }
}

export default TodoItem;
