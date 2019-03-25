import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import IosButton from '../../component/IosButton/IosButton'
//push直接入栈



const 加载中 = '加载中'
@inject(stores => ({
    hideTab: stores.main.hideTab,
    showTab: stores.main.showTab,
}))
@observer
export default class DetailsScreen extends React.Component {

    state = { words: [], index: 0, word: { kanji: 加载中, katakana: 加载中, chinese: 加载中 }, up: false, down: false }
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
        this.props.hideTab();

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
            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column' }}  >
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
                    </View>
                </View>
            </GestureRecognizer>
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