import React, {useState, useEffect, useContext } from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";
import {TodoContext} from "../context/Todo/TodoContext";
import {ScreenContext} from "../context/screen/ScreenContext";

export const MainScreen = ({ openTodo }) => {
    const { addTodo, todos, removeTodo } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext)
    const [deviseWidth, setDeviseWidth] = useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL*2
    );

    useEffect(()=>{
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL*2;
            setDeviseWidth(width)
        };
        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    })

    let content =
        <View style={{width: deviseWidth }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) =>
                    <Todo
                        todo={item}
                        onRemove={removeTodo}
                        onOpen={changeScreen}
                    />
                }
            />
        </View>
    ;

    if(todos.length === 0){
        content = <View style={styles.imageWrap}>
             {/*<Image style={styles.image} source={{uri: https://....}}/>*/}
            <Image style={styles.image} source={require('../../assets/no-items.png')}/>
        </View>;
    }

    return <View>
        <AddTodo onSubmit={addTodo} />
        {content}
    </View>
}

const styles = StyleSheet.create({
    imageWrap: {
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
        height: 300
    },
    image: {
        width: '100%',
        height:  '100%',
        resizeMode: 'contain'
    }
});