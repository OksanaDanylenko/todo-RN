import * as types from '../types';

const handlers = {
     [types.ADD_TODO]: (state, {title}) => ({ ...state,
         todos: [...state.todos,
             {  id: Date.now().toString(),
                 title: title
             }
         ]}),
    [types.REMOVE_TODO]: (state, {id}) => ({
        ...state, todos: state.todos.filter((todo)=>todo.id !== id)
    }),
    [types.UPDATE_TODO]: (state, {id, title}) => ({
        ...state, todos: state.todos.map(todo => {
            if (todo.id === id){
                todo.title = title;
            }
            return todo;
        })
    }),
    DEFAULT: state => state
}

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}