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


    componentWillReceiveProps=(nextProps)=>{
        // alert(nextProps.notificationDate);
        store.main.setNotification({path:nextProps.notificationDate});
    }
    render() {
        // {store.main.setNotification({path:this.props.notificationDate})}
        return (
            <Provider {...store}>
                <App />
            </Provider>
        )
    }
}


AppRegistry.registerComponent(appName, () => Index);
