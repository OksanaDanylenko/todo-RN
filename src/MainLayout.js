import React, {useState, useContext } from 'react';
import {Alert, StyleSheet, View} from "react-native";
import {Navbar} from "./components/Navbar";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {THEME} from "./theme";
import {TodoContext} from "./context/Todo/TodoContext";
import {ScreenContext} from "./context/screen/ScreenContext";

export const MainLayout = ({}) =>{
    const {todos, addTodo, removeTodo, updateTodo} =useContext(TodoContext);
    const{todoId, changeScreen} = useContext(ScreenContext)

    // const removeTodo = (id) => {
    //     const todo = todos.find(t => t.id === id)
    //     Alert.alert(
    //         "Delete item",
    //         `Are you sure to delete ${todo.title}`,
    //         [
    //             {
    //                 text: "Cancel",
    //                 style: "cancel"
    //             },
    //             { text: "Delete",
    //                 onPress: () => {
    //                     setTodoId(null);
    //                     setTodos(prev=> prev.filter(todo => todo.id !== id));
    //                 }
    //             }
    //         ],
    //         { cancelable: false }
    //     );
    // }


    let content = (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={changeScreen}
        />
    );

    if(todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content = <TodoScreen
            todo={selectedTodo}
            goBack={() => changeScreen(null)}
            onRemove={removeTodo}
            onSave={updateTodo}
        />
    }

    return (
        <View>
            <Navbar title={'Todo App'} />
            <View style={styles.container}>
                {content}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
});
