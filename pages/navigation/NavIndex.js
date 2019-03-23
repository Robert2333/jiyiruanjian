import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {TabBarState} from '../../context/TabBarContext'

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
      };
      static contextType=TabBarState;
    render() {
        let {hello,hideTabBar}=this.context;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Text >{hello}</Text>
                <Button
                    title="隐藏tabbar"
                    onPress={hideTabBar}
                />
            </View>
        );
    }
}

//push直接入栈
class DetailsScreen extends React.Component {

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('id')===undefined?0:navigation.getParam('id');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>{itemId}</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.push('Details',{id:itemId+1})}
                />
            </View>
        );
    }
}

export default createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

