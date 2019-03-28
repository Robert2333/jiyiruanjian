import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, NativeModules } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Word from '../word/Word.js'
import ListItem from './component/ListItem/ListItem'
import StorageUtil from '../utils/StorageUtil'
import { inject, observer } from 'mobx-react'

const Notification = NativeModules.Notification;

@inject(stores => ({
  path: stores.main.path,
  setPath: stores.main.setPath,
  notificationDate: stores.main.notificationDate,
  setNotification: stores.main.setNotification
}))
@observer
class HomeScreen extends React.Component {


  static navigationOptions = {
    title: '单词列表',
  };

  getData = () => {
    this.setState({reFresh:true})
    return fetch('https://citynotes.cn/getContent', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // for(let i=0;i<result.length;i++){
        //   Notification.addEvent('复习了',result[i].date,'1');
        // }
        this.setState({ dataSource: result ,reFresh:false})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //url https://citynotes.cn/getContent
  componentDidMount = () => {
    this.goToWordPage(this.props);
    this.getData();
  }

  goToWordPage = (props) => {
    let date = props.notificationDate.path;
    if (date == undefined) {
      date = '';
    }
    if (date !== undefined && date.trim() !== '' && date != null && date != 'null') {
      StorageUtil.get(date).then(d => {
        if (date !== undefined && date.trim() !== '' && date != null && date != 'null' && date !== d) {
          StorageUtil.save(date, date);
          date = date.substr(0, 10);
          this.props.navigation.navigate('Word', { date: date })
        }
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.goToWordPage(nextProps);
  }

  state = { dataSource: [],reFresh:false }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) => <ListItem key={index} date={item.date} index={index} count={item.count}
            navigation={this.props.navigation} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshing={this.state.reFresh}
          onRefresh={() => {
            this.getData()
          }}

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

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    marginBottom: 80,

  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
})
