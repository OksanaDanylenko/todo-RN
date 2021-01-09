import * as types from '../types';

const handlers = {
  [types.ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [...state.todos, { id, title }],
  }),
  [types.REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [types.UPDATE_TODO]: (state, { id, title }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }),
  }),
  [types.SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [types.HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [types.SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [types.CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [types.FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: (state) => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
