import React from 'react';
import { View, Text, Button,FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Word from '../word/Word.js'
class HomeScreen extends React.Component {

    static navigationOptions = {
        title: '单词列表',
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={({ item }) => <Text>{item.key}</Text>}
                />
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

