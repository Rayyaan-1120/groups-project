import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateGroup from "./app/screens/CreateGroup";
import Groups from "./app/screens/Groups";
import { GroupContext } from './app/components/Context';
import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainNavigation } from './app/screens/navigation';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
  <GroupContext>
  <NavigationContainer>
   <MainNavigation />
  </NavigationContainer>
  </GroupContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
