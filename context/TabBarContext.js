import React from 'react'
import {StyleSheet} from 'react-native'

export const TabBarState=React.createContext(
   {hello:"value",hideTabBar:()=>{}}
)

export const tabStyles = StyleSheet.create({
    show: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      height:80,
      // overflow:'hidden'
    },
    hidden:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height:0,
        overflow:'hidden'
    }
  });