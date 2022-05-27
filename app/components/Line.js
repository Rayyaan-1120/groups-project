import React from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from "react-native";

const Line = ({ route }) =>
    {
         return(
        <View>
            <TouchableOpacity style={styles.button}>
                <Button color="green" title={route.params.groupName}/>
            </TouchableOpacity>
        </View>)
    };

export default Line;
//<Text style={styles.text_group}> {route.params.groupName}</Text>
const styles = StyleSheet.create({
    text_group: {
        paddingTop: 45,
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: 15
    },
    button: {
        width: 100,
        top: 22,
        alignSelf: "center",
        paddingTop: 20,
    }
});