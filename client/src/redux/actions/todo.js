export function fetchTodos() {
    return {
        type: "TODO_LIST_RECEIVED",
        payload: {
            todos: [
                { text: "todo 1" }, { text: "todo 2", checked: true }
            ]
        }
    }
}

export function completeTodo(todo) {
    return {
        type: "TODO_COMPLETE",
        payload: {
            todo
        }
    }
}

export function deleteTodo(todo) {
    return {
        type: "TODO_DELETE",
        payload: {
            todo
        }
    }
}

export function addTodo(todo) {
    return {
        type: "TODO_ADD",
        payload: {
            todo
        }
    }
}
