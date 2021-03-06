/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import { StyleSheet, Text, View, AppRegistry, Button, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from 'react-native'
import NavPage from './pages/navigation/NavIndex'
import T from './pages/Index'
import { inject, observer } from 'mobx-react'
import StorageUtil from './pages/utils/StorageUtil'
const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px * deviceW / basePx
}


// type Props = {};
@inject(stores => ({
  tabState: stores.main.tabState,
  hideTab: stores.main.hideTab,
  showTab: stores.main.showTab,
  path: stores.main.path,
  setPath: stores.main.setPath,
  notificationDate: stores.main.notificationDate,
  setNotification:stores.main.setNotification
}))
@observer
export default class App extends Component {

  //todo 判断如果是是不需要刷新页面的通知的时候就不更新
  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  }
  // componentWillUpdate = () => {
  //  // alert(this.props.notificationDate.path);
  //   let date=this.props.notificationDate.path;
  //   if(date==undefined){
  //     date='';
  //   }
  //     if (date !== undefined && date.trim() !== '' && date != null && date != 'null') {
  //       StorageUtil.get(date).then(d => {
  //         if (date !== undefined && date.trim() !== '' && date != null && date != 'null' && date !== d) {
  //           StorageUtil.save(date, date);
  //           date = date.substr(0, 10);
  //           this.props.setPath({ path: date });
  //           this.setState({ selectedTab: 'profile' });
  //         }
  //       })
  //     }
  // }

 
  componentWillReceiveProps=(nextProps)=>{
    this.goToNavIndex(nextProps);
  }

  goToNavIndex=(props)=>{
    let date=props.notificationDate.path;
    if(date==undefined){
      date='';
    }
      if (date !== undefined && date.trim() !== '' && date != null && date != 'null') {
        StorageUtil.get(date).then(d => {
          if (date !== undefined && date.trim() !== '' && date != null && date != 'null' && date !== d) {
           // StorageUtil.save(date, date);
            date = date.substr(0, 10);
            // props.setPath({ path: date });
            this.setState({ selectedTab: 'profile' });
          }
        })
      }
  }
  componentDidMount = () => {
      this.goToNavIndex(this.props);
  }


  state = { selectedTab: 'home', preNotificationDate: '', path: 'test' }
  hideTabBar = () => {
    this.setState({ tabBarStyle: tabStyles.hidden });
  }
  render() {

    return (
      <TabNavigator tabBarStyle={this.props.tabState} sceneStyle={{ paddingBottom: 0 }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          tabStyle={styles.item}
          title="随机单词"
          renderIcon={() => <Icon name="home" size={px2dp(30)} color="#666" />}
          renderSelectedIcon={() => <Icon name="home" size={px2dp(30)} color="#3496f0" />}
          // badgeText="0"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {<View style={{ flex: 1, justifyContent: 'center' }}>
            {/* <Text>{this.props.date}}</Text> */}
            <T />

          </View>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          tabStyle={styles.item}
          title="单词列表"
          renderIcon={() => <Icon name="user" size={px2dp(30)} color="#666" />}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(30)} color="#3496f0" />}
          renderBadge={() => { <Text>2</Text> }}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          <NavPage />
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
    height: 80,
    // overflow:'hidden'
  },
  item: {
    marginBottom: 25,
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

AppRegistry.registerComponent("AwesomeProject", () => App);