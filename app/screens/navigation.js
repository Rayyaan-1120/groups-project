import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Groups from './Groups';
import CreateGroup from './CreateGroup';

import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 
import { colors } from '../components/theme';
import GroupManager from './GroupsManager';
import EditGroup from './EditGroup';


const GroupScreens = () => {
    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator>
      <Stack.Screen
          name="Groups"
          component={Groups}
          options={{ title: 'My Groups' }}
      />
      <Stack.Screen name="CreateGroup" options={{ title: 'Create Your Group' }} component={CreateGroup} />
      <Stack.Screen name="GroupManager" options={{ title: 'Group Overview' }} component={GroupManager} />
      <Stack.Screen name="EditGroup" options={{ title: 'Edit Group' }} component={EditGroup} />
    </Stack.Navigator>
    )
}

export const MainNavigation = () => {

    const Tab = createBottomTabNavigator()

    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="Group-Preview" component={GroupScreens} options={{tabBarIcon:() => <MaterialIcons name="group-add" size={30} color={colors.primary}/>,tabBarLabelStyle:{color:colors.primary,fontSize:12,marginBottom:2}}}/>
            <Tab.Screen name="Group-Preview-two" component={GroupScreens} options={{tabBarIcon:() => <MaterialIcons name="group-add" size={30} color={colors.primary}/>,tabBarLabelStyle:{color:colors.primary,fontSize:12,marginBottom:2}}}/>
            <Tab.Screen name="Group-Preview-three" component={GroupScreens} options={{tabBarIcon:() => <MaterialIcons name="group-add" size={30} color={colors.primary}/>,tabBarLabelStyle:{color:colors.primary,fontSize:12,marginBottom:2}}}/>
        </Tab.Navigator>
    )
}