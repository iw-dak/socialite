import React from 'react';

class TodoItemActions extends React.Component {
    render() {
        const { onComplete, onDelete } = this.props;

        return (
            <>
                <a href="#complete" onClick={onComplete}>Set complete</a>
                <a href="#delete" onClick={onDelete}>Delete</a>
            </>
        );
    }
}

export default TodoItemActions;
