import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Word from '../word/Word.js'
class HomeScreen extends React.Component {
    //跳转方法
    static navigationOptions = {
        title: '单词列表',
      };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Word')}
                />
                <Text>{this.props.path}</Text>
            </View>
        );
    }
}



export default createStackNavigator(
    {
        Home: HomeScreen,
        Word: Word,
    },
    {
        initialRouteName: 'Home',
    }
);

