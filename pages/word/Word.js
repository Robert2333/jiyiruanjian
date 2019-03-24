import React from 'react';
import { View, Text, Button } from 'react-native'
import { inject, observer } from 'mobx-react'
//push直接入栈

@inject(stores => ({
    hideTab: stores.main.hideTab,
    showTab: stores.main.showTab,
}))
@observer
export default class DetailsScreen extends React.Component {


    componentDidMount = () => {
        this.props.hideTab();
    }

    componentWillUnmount = () => {
        this.props.showTab();
    }

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('id') === undefined ? 0 : navigation.getParam('id');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.push('Details', { id: itemId + 1 })}
                />
            </View>
        );
    }
}