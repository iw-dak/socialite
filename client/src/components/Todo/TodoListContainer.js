import React from 'react';
import {connect} from 'react-redux';
import TodoList from './TodoList';
import { fetchTodos } from '../../redux/actions/todo';

class TodoListContainer extends React.Component {

    componentDidMount() {
        setTimeout(() => this.props.loadTodos(), 2000);
    }

    render() {
        return (
            <TodoList todos={this.props.todos} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todoReducer.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTodos: () => dispatch(fetchTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
