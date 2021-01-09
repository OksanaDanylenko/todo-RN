import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { TodoContext } from './TodoContext';
import { todoReducer } from './TodoReducer';
import * as types from '../types';
import { ScreenContext } from '../screen/ScreenContext';
import { Http } from '../../http';

const API_URL =
  'https://react-native-todo-app-ad916-default-rtdb.firebaseio.com/todos.json';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(API_URL, { title });
      dispatch({ type: types.ADD_TODO, title, id: data.name });
    } catch (e) {
      showError('Something went wrong, please, try again...');
    }
  };
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      'Delete item',
      `Are you sure to delete ${todo.title}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            changeScreen(null);

            await Http.delete(
              `https://react-native-todo-app-ad916-default-rtdb.firebaseio.com/todos/${id}.json`,
            );
            dispatch({ type: types.REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false },
    );
  };
  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://react-native-todo-app-ad916-default-rtdb.firebaseio.com/todos/${id}.json`,
        { id, title },
      );
      dispatch({ type: types.UPDATE_TODO, id, title });
    } catch (e) {
      showError('Something went wrong, please, try again...');
      console.log(e);
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(API_URL);
      console.log('Fetch data', data);
      const todos = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
        : [];
      dispatch({ type: types.FETCH_TODOS, todos });
    } catch (e) {
      showError('Something went wrong, please, try again...');
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: types.SHOW_LOADER });

  const hideLoader = () => dispatch({ type: types.HIDE_LOADER });

  const showError = (error) => dispatch({ type: types.SHOW_ERROR, error });

  const clearError = () => dispatch({ type: types.CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
