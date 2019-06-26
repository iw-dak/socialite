const todoReducer = (state = {
    todos:[]
}, action) => {
    switch (action.type) {
        case "TODO_LIST_RECEIVED":
            return {
                ...state,
                todos: action.payload.todos
            }
        case "TODO_COMPLETE":
            return {
                ...state,
                todos: state.todos.map(item => {
                    if (action.payload.todo.text === item.text) {
                        item.checked = !item.checked;
                    }
                    return item;
                })
            }
        case "TODO_DELETE":
            return {
                ...state,
                todos: state.todos.filter(item => {
                    return action.payload.todo.text !== item.text;
                })
            }
        case "TODO_ADD":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload.todo,
                  ]
            }
        default:
            return state;
    }
}

export default todoReducer;
