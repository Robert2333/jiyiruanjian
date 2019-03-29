import React from 'react';
import { View, Text, Slider, NativeModules, StyleSheet, PanResponder } from 'react-native'
import { inject, observer } from 'mobx-react'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import IosButton from '../../component/IosButton/IosButton'
import MyDatePicker from './component/MyDatePicker'
import StorageUtil from '../utils/StorageUtil'
//push直接入栈


const Notification = NativeModules.Notification;
const 加载中 = '加载中'
@inject(stores => ({
    hideTab: stores.main.hideTab,
    showTab: stores.main.showTab,
    setPath: stores.main.setPath,
}))
@observer
export default class DetailsScreen extends React.Component {

    state = { words: [], index: 0, word: { kanji: 加载中, katakana: 加载中, chinese: 加载中 }, up: false, down: false, showPicker: false }
    getWords = (date) => {
        return fetch(`https://citynotes.cn/getWord?date=${date}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({ words: result, index: 0, word: result[0] })
            })
            .catch((error) => {
                console.error(error);
            });
    }


    componentWillMount = () => {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                //return true if user is swiping, return false if it's a single click
                if ((Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) >20) ){
                    return true;
                }else{
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
                if ((Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) >20) ){
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
                }else{
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

    pickerPress = (minus) => {
        this.setState({ showPicker: false })
        const { navigation } = this.props;
        const date = navigation.getParam('date', null);
        StorageUtil.save(date, date);
        if (minus === '0') {
            minus = '1'
        }
        Notification.addEvent('复习了', date, minus);
    }

    pickerCancel = () => {
        this.setState({ showPicker: false })
        const { navigation } = this.props;
        const date = navigation.getParam('date', null);
        StorageUtil.save(date, date);
        alert('已经取消该课')
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

    onSwipe = (gestureName, gestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({ up: !this.state.up })
                break;
            case SWIPE_DOWN:
                this.setState({ down: !this.state.down })
                break;
            case SWIPE_LEFT:
                this.nextOrPre(true);
                break;
            case SWIPE_RIGHT:
                this.nextOrPre(false);
                break;
        }
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        const date = navigation.getParam('date', null);
        this.getWords(date);
        this.props.setPath(Object.assign({}, { path: '' }));
        this.props.hideTab();

        StorageUtil.get(date).then(d => {
            if (d == "null") {
                //显示时间选择
                this.setState({ showPicker: true })

            }
        })
        // if(StorageUtil.get(date)!=undefined){

        // }
    }

    componentWillUnmount = () => {
        this.props.showTab();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('date', '单词'),
        };
    };

    render() {
        const showUp = this.state.up ? styles.showText : styles.hideText;
        const showDown = this.state.down ? styles.showText : styles.hideText;
        return (
            // <GestureRecognizer
            //     onSwipe={(direction, state) => this.onSwipe(direction, state)}
            //     style={{ flex: 1 }}
            // >
            <View style={{ flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}  {...this._panResponder.panHandlers}>
                {/* <Text>{this.state.words.length}</Text>
                    <Text>{this.state.index}</Text> */}
                <Text style={showUp}>{this.state.word.katakana}</Text>
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
                <MyDatePicker
                    visible={this.state.showPicker}
                    ok={this.pickerPress}
                    cancel={this.pickerCancel}
                />
            </View>

            // </GestureRecognizer>
        );
    }
}

const styles = StyleSheet.create({
    showText: {
        fontSize: 25, flex: 1
    },
    hideText: {
        fontSize: 25, flex: 1, width: 0
    },
})