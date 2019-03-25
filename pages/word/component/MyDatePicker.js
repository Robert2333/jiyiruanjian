import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, TextInput, Button, Alert, PushNotificationIOS, NativeModules
    , DatePickerIOS, Switch, TabBarIOS
} from 'react-native';


export default class MyDatePicker extends React.Component {
    state = { text: '', chosenDate: new Date(), backupDate: new Date(), minus: '0' }

    setDate = (newDate) => {
        console.log(newDate);
        console.log(this.state.backupDate)

        const minus = JSON.stringify(Math.abs(newDate - this.state.backupDate) / 1000);    //这里拿到的就是天数
        console.log(minus.toString());

        this.setState({ chosenDate: newDate, minus })
    }
    render() {
        return (
            <View style={
                this.props.visible ?
                    { position: 'absolute', bottom: 0, backgroundColor: 'white', height: 300, zIndex: 999, } :
                    { display: 'none' }
            }>
                <Button
                    onPress={() => this.props.ok(this.state.minus)}
                    title="确定"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                
                <Button
                    onPress={() => this.props.cancel()}
                    title="取消"
                    color="red"
                    accessibilityLabel="Learn more about this purple button"
                />
                <DatePickerIOS style={{ width: 400, height: 100 }}
                    mode={"datetime"}   //选择器模式: 'date'(日期), 'time'(时间), 'datetime'(日期和时间)
                    minimumDate={new Date()}  //最小时间 (这里设置的是当前的时间)
                    minuteInterval={1} //最小时间间隔 (这里设置的是30分钟)
                    date={this.state.chosenDate}  //默认的时间
                    onDateChange={this.setDate}  //日期被修改时回调此函数
                />
            </View>
        )
    }
}