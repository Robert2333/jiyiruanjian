/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from "mobx-react";
import React from 'react';
import store from './stores/store.js'
class Index extends React.Component {

    render() {
        return (
            <Provider {...store}>
                <App date={this.props.notificationDate}/>
            </Provider>
        )
    }
}


AppRegistry.registerComponent(appName, () => Index);
