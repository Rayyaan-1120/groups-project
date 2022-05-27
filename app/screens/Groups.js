import React from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View,SafeAreaView,Dimensions} from 'react-native';
import { useGroup } from '../components/Context';
import Line from "../components/Line";
import { colors } from '../components/theme';
import CreateGroup from "./CreateGroup";



const { width, height } = Dimensions.get("window");


const Groups = ({ navigation, route}) => {



  const { groups, setgroups } = useGroup();
   console.log(groups,'groups');

    return (
            <SafeAreaView style={styles.container}>
                <FlatList 
                contentContainerStyle={{alignItems: 'center'}}
                ListEmptyComponent={
                    <View style={styles.emptycomponent}>
                        <Text style={styles.emptycomponenttext}>No Groups</Text>
                    </View>
                }
                data={groups?.slice().reverse()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('GroupManager', {
                                data:item
                            })
                        }} activeOpacity={0.5} style={styles.flatlistitem}>
                            <Text style={styles.flatlistitemtext}>{item?.groupName}</Text>
                        </TouchableOpacity>
                    )
                }}
                />
                <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('CreateGroup')}
                >
                    <Text style={styles.btntext}>+</Text>
                </TouchableOpacity>
            </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 45,
        // paddingLeft: 15,
        width: width,
        // height: 68,
        backgroundColor: colors.bg,
        position:"relative"
    },
    flatlistitem: {
        padding: 15,
        width: width / 1.02,
        // br
        elevation:12,
        backgroundColor: colors.bg,
        marginVertical: 10,
        borderRadius:10
    },
    flatlistitemtext: {
        fontSize: 20,
        color: colors.text,
        paddingLeft: 5,
    },
    emptycomponent:{

        alignItems: "center",
        justifyContent:"center",
        marginTop:50
    },

    emptycomponenttext:{
        fontSize:25,
        fontWeight:"bold",
        color:colors.text,
        textAlign: "center",
    },

    btn: {
        width: 65,
        height: 65,
        backgroundColor: colors.primary,
        borderRadius: 100,
        position:"absolute",
        bottom: 20,
        right: 15,
        elevation:10,
        alignItems: "center",
        justifyContent:"center"
    },

    btntext: {
        fontSize: 22,
        color:colors.text_light,
    }
});

export default Groups;