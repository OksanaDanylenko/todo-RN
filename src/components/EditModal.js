import React, { useState } from 'react';
import {THEME} from '../theme';
import { View,TextInput, StyleSheet, Modal, Alert } from  'react-native';
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ value, visible, onCancel, onSave }) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if(title.trim().length < 3){
            Alert.alert('Error!', `Min title length is 3 symbols. Now it is ${title.trim().length}`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value);
        onCancel();
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    style={styles.input}
                    onChangeText={setTitle}
                    placeholder="Enter name"
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons} >
                    <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>Cancel</AppButton>
                    <AppButton onPress={saveHandler}>Save</AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginTop: 30,
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "space-around"
    }
})