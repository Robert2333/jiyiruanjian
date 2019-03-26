/**
 * @format
 */

import { AppRegistry,NativeModules } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from "mobx-react";
import React from 'react';
import store from './stores/store.js'

const First = NativeModules.First;
class Index extends React.Component {

    componentWillMount=()=>{
       // alert(this.props.notificationDate)
        // this.goToNavIndex(this.props);
      }

    componentWillReceiveProps=(nextProps)=>{
        // alert(nextProps.notificationDate);
        store.main.setNotification({path:nextProps.notificationDate});
    }
    componentDidMount=()=>{
        First.addEventtest((date)=>{
            if(date!='')
            store.main.setNotification({path:date});
        })
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
