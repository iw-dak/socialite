import React from 'react';
import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo, completeTodo } from '../../redux/actions/todo';

class TodoItemContainer extends React.Component {

    render() {
        return (
            <TodoItem
                todo={this.props.todo}
                onCheck={this.props.delete}
                onDelete={this.props.complete} />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        delete: (todo) => dispatch(deleteTodo(todo)),
        complete: (todo) => dispatch(completeTodo(todo))
    }
}

export default connect(undefined, mapDispatchToProps)(TodoItemContainer);
