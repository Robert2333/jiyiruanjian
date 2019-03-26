/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, TextInput, Button, Alert, PushNotificationIOS, NativeModules
  , DatePickerIOS, Switch, TabBarIOS
} from 'react-native';
const Notification = NativeModules.Notification;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = { text: '', chosenDate: new Date(), backupDate: new Date(), minus: '0' }


  setDate = (newDate) => {
    console.log(newDate);
    console.log(this.state.backupDate)

    const minus = JSON.stringify((newDate - this.state.backupDate) / 1000);    //这里拿到的就是天数
    console.log(minus.toString());

    this.setState({ chosenDate: newDate, minus })
  }
  onPressLearnMore = () => {
    //todo 改成了5
    //Notification.addEvent('徐俊超又成功啦', this.state.minus);
    Notification.addEvent('徐俊超又成功啦', '2019-03-06-25','1');
    Alert.alert(
      'test',
      'All your data are belong to us.'
    );
  }
  render() {
    return (


      <View style={styles.container}>
        <Switch />
        <Text style={styles.welcome}>这里搞随机单词测试</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text>zaaaaaa</Text>
        {/* <DatePickerIOS style={{ width: 400, height: 100 }}
          mode={"datetime"}   //选择器模式: 'date'(日期), 'time'(时间), 'datetime'(日期和时间)
          minimumDate={new Date()}  //最小时间 (这里设置的是当前的时间)
          minuteInterval={1} //最小时间间隔 (这里设置的是30分钟)
          date={this.state.chosenDate}  //默认的时间
          onDateChange={this.setDate}  //日期被修改时回调此函数
        /> */}
        <Button
          onPress={this.onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
