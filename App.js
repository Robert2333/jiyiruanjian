/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import tab1Img from './static/tab1.png'
import tab2Img from './static/tab2.png'
import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  Platform, StyleSheet, Text, View, TextInput, Button, Alert, PushNotificationIOS, NativeModules
  , DatePickerIOS, Switch, TabBarIOS,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Dimensions} from 'react-native'
import NavPage from './pages/navigation/NavIndex'
import T from './pages/Index'
const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}
// type Props = {};
export default class App extends Component {

  state = { selectedTab: 'home' }
  render() {
    return (
      <TabNavigator tabBarStyle={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          tabStyle={styles.item}
          title="徐俊超"
          renderIcon={() => <Icon name="home" size={px2dp(30)} color="#666"/>}
          renderSelectedIcon={() =>  <Icon name="home" size={px2dp(30)} color="#3496f0"/>}
          // badgeText="0"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {<T/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          tabStyle={styles.item}
          title="Profile"
          renderIcon={() => <Icon name="user" size={px2dp(30)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(30)} color="#3496f0"/>}
          renderBadge={() =>{<Text>2222222222222s</Text>}}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          {<Text>llll</Text>}
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height:80,
  },
  item:{
    marginBottom:25,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});