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
  , DatePickerIOS, Switch, TabBarIOS, PanResponder, Slider
} from 'react-native';
import { tsThisType } from '@babel/types';
import IosButton from '../component/IosButton/IosButton'
import StorageUtil from './utils/StorageUtil'
import Icon from 'react-native-vector-icons/FontAwesome'
import { inject, observer } from 'mobx-react'
const Notification = NativeModules.Notification;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
@inject(stores => ({
  collectionState: stores.main.collectionState,
  changeCollectionState: stores.main.changeCollectionState,
}))
@observer
export default class App extends Component<Props> {

  componentWillReceiveProps = (nextProps) => {
    StorageUtil.get("collection").then(data => {
      if (data !== 'null') {
        let dataArr = [];
        for (let key in data) {
          dataArr.push(data[key])
        }
        if (dataArr.length > 0)
          this.setState({ words: dataArr, word: dataArr[0] })
        else
          this.setState(  state = { words: [], index: 0, word: { kanji: '暂无数据', katakana: '暂无数据', chinese: '暂无数据' }, up: false, down: false, showPicker: false, color: '' })
      } else {
        this.setState(  state = { words: [], index: 0, word: { kanji: '暂无数据', katakana: '暂无数据', chinese: '暂无数据' }, up: false, down: false, showPicker: false, color: '' })
      }
    })
  }

  componentDidMount = () => {
    StorageUtil.get("collection").then(data => {
      if (data !== 'null') {
        let dataArr = [];
        for (let key in data) {
          dataArr.push(data[key])
        }
        if (dataArr.length > 0)
          this.setState({ words: dataArr, word: dataArr[0] })
      }
    })
  }
  state = { words: [], index: 0, word: { kanji: '暂无数据', katakana: '暂无数据', chinese: '暂无数据',date:'' }, up: false, down: false, showPicker: false, color: '' }


  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        //return true if user is swiping, return false if it's a single click
        if ((Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20)) {
          return true;
        } else {
          return false;
        }
        //    return !(gestureState.dx === 0 && gestureState.dy === 0)                  
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        // alert(gestureState.dx)
        if ((Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20)) {
          if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
            if (gestureState.dx > 0) {
              this.nextOrPre(false);
            } else {
              this.nextOrPre(true);
            }
          } else {
            if (gestureState.dy > 0) {
              this.setState({ up: !this.state.up })
            } else {
              this.setState({ down: !this.state.down })
            }
          }
        } else {
          return false;
        }


      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }


  nextOrPre = (isNext) => {
    const { index, word, words } = this.state;
    if (isNext) {
      if (this.state.index < this.state.words.length - 1) {
        this.setState({ index: index + 1, word: words[index + 1] })
      } else {
        alert("最后一个了")
      }
    } else {
      if (this.state.index > 0) {
        this.setState({ index: index - 1, word: words[index - 1] })
      } else {
        alert("已经是第一个了")
      }
    }
  }



  render() {
    const showUp = this.state.up ? styles.showText : styles.hideText;
    const showDown = this.state.down ? styles.showText : styles.hideText;
    // const color = this.getColor();
    return (
      <View style={{ flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}  {...this._panResponder.panHandlers}>
        {/* <Text>{this.state.words.length}</Text>
                  <Text>{this.state.index}</Text> */}
        {/* <View style={{ flex: 1, display: 'flex', flexDirection: 'row' ,justifyContent:'space-around'}}> */}
        <Text style={{marginTop:50}}>{this.state.word.date}</Text>
        <Text style={showUp}>{this.state.word.katakana}</Text>
        <View style={{ position: 'absolute', right: 10, top: -5 }}>
          <Icon name="star" size={30} color={'yellow'} onPress={() => alert("请到具体页面去取消收藏")} />
        </View>
        {/* </View> */}
        <Text style={{ fontSize: 40, flex: 1 }}>{this.state.word.kanji}</Text>
        <View style={{ display: 'flex', flex: 2, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}>
          <Text style={showDown}>{this.state.word.chinese}</Text>
          <View style={{ display: 'flex', flex: 2, justifyContent: 'space-around', flexDirection: 'row' }}>
            <IosButton title="上一个" color="#2f54eb" onPress={() => { this.nextOrPre(false) }} width={80} />
            <IosButton title="下一个" color="#2f54eb" onPress={() => { this.nextOrPre(true) }} width={80} />
          </View>
          {/* 不这么写会导致max为0出现bug */}
          {this.state.words.length > 0 ?
            (<View style={{ width: 300, flex: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ fontSize: 24 }}>{this.state.index + 1}/{this.state.words.length}</Text>
              <Slider
                style={{ width: 300 }}
                maximumValue={(this.state.words.length - 1)}
                minimumValue={0}
                value={this.state.index} step={1}
                onValueChange={(e) => {
                  this.setState({ index: e, word: this.state.words[e] })
                }
                } />
            </View>) :
            <Text></Text>}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  showText: {
    fontSize: 25,
    flex: 1,
    // marginLeft:50 ,

  },
  hideText: {
    fontSize: 25, flex: 1, color: 'transparent',
  },
})