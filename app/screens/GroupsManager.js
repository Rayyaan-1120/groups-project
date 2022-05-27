import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,SafeAreaView,TouchableOpacity,Dimensions,Platform,Alert,LogBox} from 'react-native';
import { colors } from '../components/theme';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useGroup } from '../components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateItem } from '../utils/utilfunctions';

const { width, height } = Dimensions.get("window");


const GroupManager = ({navigation,route}) => {

  LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);
    

    const {data} = route.params;

    const [show,setshow] = useState(false)
    const [dateval,setdateval] = useState(new Date(data.date))
    const [save,setsave] = useState(false)

    const {groups,setgroups} = useGroup()

    


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



    const onChangeDatePicker  = (event,date) => {
        console.log(date,'date')
        console.log(event.type,'event')
        if(event.type === 'set'){
            setdateval(date)
            setshow(false)
            updateItem(data.id,'date',date,groups,setgroups)
            setsave(true)
        }
    }

    


    return(
        <SafeAreaView style={{flex: 1,backgroundColor:colors.bg,position: 'relative'}}>
            <TouchableOpacity style={styles.viewbox} onPress={() => navigation.navigate('EditGroup',{
                data:data,
            })}>
                <Text style={styles.text}>Manage Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewboxtwo} onPress={() => setshow(true)}>
                <Text style={styles.text}>Change Date</Text>
                <Text>{dateval?.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                >
                    <Entypo name="chat" size={26} color="#fff" />
                </TouchableOpacity>
            {show && (
                <DateTimePicker 
                mode='date'
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                value={dateval}
                onChange={onChangeDatePicker}
                is24Hour={true}
                />
            )}

        </SafeAreaView>
    )
}

export default GroupManager;

const styles = StyleSheet.create({
   viewbox: {
     width:width,
     padding:20,
     backgroundColor:colors.bg,
     borderBottomWidth:1,
     borderBottomColor:colors.primary
   },
   viewboxtwo: {
     width:width,
     padding:20,
     backgroundColor:colors.bg,
     borderBottomWidth:1,
     flexDirection:"row",
     alignItems: "center",
     justifyContent:"space-between",
     borderBottomColor:colors.primary
   },
   text:{
         fontSize:18,
         color:colors.primary,
        fontWeight:'bold'

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
});