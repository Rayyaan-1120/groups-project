import React,{createContext,useContext,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainContext = createContext()

export const GroupContext = ({children}) => {
    const [groups,setgroups] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('groups').then(data => {
            console.log('data', data)
            if(data !== null) {
                setgroups(JSON.parse(data))
            }else{
                setgroups([])
            }
        }).catch(err => {
            alert(err.message)
        })
    },[])

    return(
        <MainContext.Provider value={{groups,setgroups}}>
            {children}
        </MainContext.Provider>
    )
}

export const useGroup = () => useContext(MainContext)