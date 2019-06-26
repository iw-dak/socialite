import React from "react";

class TodoForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    return false;
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ text: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default TodoForm;
