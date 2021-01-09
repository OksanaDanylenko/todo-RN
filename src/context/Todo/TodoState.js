import React, { useReducer, useContext } from "react";
import { Alert } from 'react-native';
import { TodoContext } from './TodoContext';
import { todoReducer } from './TodoReducer';
import * as types from '../types';
import {ScreenContext} from "../screen/ScreenContext";

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [ {id: '2', title: "Play"}]
    };
    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch]  = useReducer(todoReducer, initialState);
    const addTodo = title => dispatch({type: types.ADD_TODO, title });
    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);
            Alert.alert(
                "Delete item",
                `Are you sure to delete ${todo.title}`,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { text: "Delete",
                        onPress: () => {
                            changeScreen(null);
                            dispatch({type: types.REMOVE_TODO, id});
                        }
                    }
                ],
                { cancelable: false }
            );
    }
    const updateTodo = (id, title) => dispatch({type: types.UPDATE_TODO, id, title });


    return <TodoContext.Provider value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
    }}>
        {children}
    </TodoContext.Provider>;
}