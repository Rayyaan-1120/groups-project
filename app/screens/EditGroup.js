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
  LogBox,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../components/theme";
import { useGroup } from "../components/Context";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { updateItem } from "../utils/utilfunctions";
import Modal from "react-native-modal";


const { width, height } = Dimensions.get("window");

const EditGroup = ({ navigation, route}) => {
  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);

  const {data} = route.params;
  



    const {groups,setgroups} = useGroup()
    const [save,setsave] = useState(false)
    const [value,setvalue] = useState(data.groupName ? data.groupName : '')
    const [visible,setvisible] = useState(false)
    const [add,setadd] = useState(false)
    const [email,setemail] = useState('')
    const [mem,setmem] = useState(data.groupMembers.length > 0 ? data.groupMembers : [])

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    useEffect(() => {
        if(save){
            AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                console.log(groups,'farigh','runned')
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
      },[save])

      // useEffect(() => {

      // },[add])

    useEffect(() => {
        if(add){
           updateItem(data.id,'groupMembers',mem,groups,setgroups)
            AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                setadd(false)
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
      },[add])


      const editgroupname = () => {
          updateItem(data.id,'groupName',value,groups,setgroups)
          Alert.alert("Successfully Updated",'Group Name Updated Successfully')
          setsave(true)
      }
      
      const deletegroup = () => {
        setgroups(groups.filter(item => item.id !== data.id))
        setsave(true)
        navigation.navigate('Groups')
      }
 
      const deleteGroup = () => {
        Alert.alert(
          "Delete Group",
          "Are you sure you want to delete this group?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => deletegroup() },
          ],
          { cancelable: false }
        );
      }

      const addnewmember = () => {
        if(email.length === 0){
           return Alert.alert('Warning','Please Enter Email')
        }
        if(!validateEmail(email)){
            return Alert.alert('Warning','Please Enter Valid Email')
        }

        if(mem.includes(email)){
            return Alert.alert('Warning','Member Already Exists')
        }

        setmem([...mem,email])
        setemail('')
        setadd(true)
        Alert.alert('Success','Member Added Successfully')
        setvisible(false)
      }
      
      console.log(mem,'mem');




    return(
        <SafeAreaView style={{flex:1,backgroundColor:colors.bg,position: 'relative'}}>
             <View style={styles.container}>
        <Text style={styles.text}>Rename Group</Text>
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
          onPress={editgroupname}
        >
            <Text style={styles.btntext}>Save Changes</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.container}>

        <Text style={styles.text}>Group Members</Text>
        </View>
             <View style={styles.containertwo}>
                 {data.groupMembers.length === 0 && (

        <View style={styles.memberchip}>
            <Text style={styles.memberchiptext}>No Members</Text>
        </View>
                 )}
                 {data.groupMembers.length > 0 && data.groupMembers.map((e,i) => {
                     return(

        <View style={styles.memberchip} key={i}>
            <Text style={styles.memberchiptext}>{e}</Text>
        </View>
                     )
                 })}
        
        <TouchableOpacity onPress={() => setvisible(!visible)} style={[styles.memberchip,{flexDirection:"row",alignItems:"center"}]}>
            <Text style={[styles.memberchiptext,{marginRight:8}]}>Invite Member</Text>
            <AntDesign name="pluscircle" size={18} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.leavegroupdiv} onPress={deleteGroup}>
           <Text style={{fontSize:18}}>Leave Group</Text>
           <Feather name="log-out" size={24} color="crimson" />
        </TouchableOpacity>

      </View>
      <View>
        <Modal
        testID={'modal'}
        isVisible={visible}
        onBackButtonPress={() => setvisible(!visible)}
        onBackdropPress={() => setvisible(!visible)}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.modalview}
        >
          <View style={{backgroundColor:colors.bg,minHeight:230}}>
          <View style={styles.container}>
        <Text style={styles.text}>Invite New Member</Text>
        <TextInput
          placeholder="Enter Group Name"
          placeholderTextColor={"#d3d3d3"}
          style={styles.formInput}
          value={email}
          onChangeText={(value) => setemail(value)}
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={addnewmember}
        >
            <Text style={styles.btntext}>Add New Member</Text>
        </TouchableOpacity>
      </View>
          </View>
        </Modal>
      </View>
        </SafeAreaView>
    )
}

export default EditGroup

const styles = StyleSheet.create({
    container: {
        width: width / 1.08,
        marginLeft:10
      },
    containertwo: {
        width: width / 1.05,
        marginLeft:2,
        flexDirection:"row",
        alignItems: "center",
        flexWrap:"wrap"
      },
      memberchip:{
          padding:8,
          borderRadius:8,
          marginHorizontal:8,
          marginVertical:8,
          elevation:4,
          backgroundColor:colors.bg
      },
      memberchiptext:{
            color:colors.text,
            fontSize:13
      },
      modalview: {
        justifyContent: 'flex-end',
        margin: 0,
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
      leavegroupdiv: {
          width: width,
          borderBottomColor: colors.primary,
            borderBottomWidth: 1,
            marginTop: 20,
            padding: 15,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems: "center",
            backgroundColor: colors.bg
      }
})
