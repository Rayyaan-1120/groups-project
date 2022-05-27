/*
import * as React from 'react';
import {Button, View, Alert, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import {TextInput} from "react-native";
import {TouchableOpacity} from "react-native";



const CreateGroup = ( {navigation} ) => {
    const [name, setName] = useState('');
    let myData;
    return (
        <View style={{padding: 50}}>
            <TextInput
                style={styles.input}
                placeholder="Give a name to your group"
                onChangeText={async (name) => {
                    setName(name);
                }}
                defaultValue={name}
            />
            <TouchableOpacity style={styles.button}>
                <Button
                    color="#314561"
                    onPress={() => navigation.navigate('Groups',{ groupName: myData })}
                    title="Done"
                />
            </TouchableOpacity>
        </View>
    );
};

export default CreateGroup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        alignSelf: "flex-start",
        paddingLeft: 15,
    },
    input: {
        borderStyle: "solid",
        height: 40,
        borderColor: "green",
        borderWidth: 3,
        paddingLeft: 24,
        paddingRight: 8,
        marginTop: 10
    },
    button: {
        width: 60,
        top: 22,
        alignSelf: "center"
    }
});
*/

import React, { useState,useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  View,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../components/theme";
import { useGroup } from "../components/Context";

const { width, height } = Dimensions.get("window");

// export default class CreateGroup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             myKey: null
//         }
//     }

//     async saveKey(value) {
//         try {
//             await AsyncStorage.setItem('@MySuperStore:key', value);
//         } catch (error) {
//             console.log("Error saving data" + error);
//         }
//     }

//     showData = async() => {
//         try {
//             const value = await AsyncStorage.getItem('@MySuperStore:key');
//             this.setState({myKey: value});
//         } catch (error) {
//             console.log("Error retrieving data" + error);
//         }
//     }

//     render({navigation}) {
//         return (
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.formInput}
//                     placeholder="Enter key you want to save!"
//                     value={this.state.myKey}
//                     onChangeText={(value) => this.saveKey(value)}
//                 />
//                 <TouchableOpacity style={styles.button}>
//                     <Button
//                         color="#314561"
//                         onPress={() => navigation.navigate('Groups',{ groupName: this.showData })}
//                         title="Done"
//                     />
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

const CreateGroup = ({ navigation }) => {
  const [value, setvalue] = useState("");
  const [loading, setloading] = useState(false);
  const [save,setsave] = useState(false);

  // const singlegroup = {
  //     groupName: value
  // }

  useEffect(() => {
    if(save){
        AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
            console.log(groups,'farigh')
            setloading(false);
            navigation.navigate("Groups");
        }).catch((error) => {
            setloading(false);
            console.log(error);
            Alert.alert("Error", error.message);
        })
    }
  },[save])
  

  const { groups, setgroups } = useGroup();

  const savegroup = () => {
    if (value.length === 0) {
      return Alert.alert("Restricted", "Please enter a group name");
    }
    setgroups((groups) => [...groups, { groupName: value,groupMembers:[],date:new Date(),id:Math.trunc(Math.random()*100000) }]);
    setloading(true);
    setsave(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        padding: 5,
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Enter Group Name</Text>
        <TextInput
          placeholder="Enter Group Name"
          placeholderTextColor={"#d3d3d3"}
          style={styles.formInput}
          value={value}
          onChangeText={(value) => setvalue(value)}
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={savegroup}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"#ffff"} />
          ) : (
            <Text style={styles.btntext}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width / 1.08,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    padding: 2,
  },
  formInput: {
    padding: 10,
    fontSize: 16,
    height: 60,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555555",
  },
  btn: {
    width: "100%",
    backgroundColor: colors.primary,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  btntext: {
    fontSize: 16,
    padding: 2,
    color: colors.text_light,
    textAlign: "center",
  },
  
});
