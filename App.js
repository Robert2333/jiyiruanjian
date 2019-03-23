/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { TabBarState, tabStyles } from './context/TabBarContext'
import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimensions } from 'react-native'
import NavPage from './pages/navigation/NavIndex'
import T from './pages/Index'
const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px * deviceW / basePx
}


// type Props = {};
export default class App extends Component {

  //todo 判断如果是是不需要刷新页面的通知的时候就不更新
  shouldComponentUpdate=(nextProps,nextState)=>{

  }
  renderImage(imgURI) {
    return (
      <Text>{imgURI}</Text>
    );
  }
  componentDidMount = () => {
    // const zzz = this.props.images[0];
    // if(zzz==='1111'&& this.state.key===true){
    //   this.setState({key:false},()=>{
    //     this.setState({selectedTab:'profile'})
    //   })
    // }
  }

  // componentWillMount = () => {
  //   this.setState({ xxxx: ++this.state.xxxx })
  // }
  state = { selectedTab: 'home', tabBarStyle: tabStyles.show, xxxx: 0 ,images:['11'],key:true}
  hideTabBar = () => {
    this.setState({ tabBarStyle: tabStyles.hidden });
  }
  render() {
    const zzz='feiwu';
    if (this.props.images !== undefined) {
      const zzz = this.props.images[0];
      if(zzz==='111111111'&& this.state.key===true){
        this.setState({key:false},()=>{
          this.setState({selectedTab:'profile'})
        })
      }
    }
    return (
      <TabNavigator tabBarStyle={this.state.tabBarStyle} sceneStyle={{ paddingBottom: 0 }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          tabStyle={styles.item}
          title="徐俊超"
          renderIcon={() => <Icon name="home" size={px2dp(30)} color="#666" />}
          renderSelectedIcon={() => <Icon name="home" size={px2dp(30)} color="#3496f0" />}
          // badgeText="0"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {<View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
          }}><Text >dafdsafdasfsadfasddsafdsafasdsds{JSON.stringify(this.state.xxxx)}</Text>
            <Text>asfdsf</Text>
            <Text>asfdsf</Text>
            <Text>asfdsf</Text>
            <Text>asfdsf</Text>
            <Text>asfdsf</Text>
            <Text>{this.props.images}</Text>
            <View>
      </View>
            <Text>{'asdfasdfdsaf'}</Text>
            <Button onPress={() => this.setState({ xxxx: this.state.xxxx + '1' })} title="Learn More" />
            <T /></View>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          tabStyle={styles.item}
          title="Profile"
          renderIcon={() => <Icon name="user" size={px2dp(30)} color="#666" />}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(30)} color="#3496f0" />}
          renderBadge={() => { <Text>2222222222222s</Text> }}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          {<TabBarState.Provider value={{ hello: 'xjc', hideTabBar: this.hideTabBar }}><NavPage /></TabBarState.Provider>}
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}
AppRegistry.registerComponent('ImageBrowserApp', () => App);
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