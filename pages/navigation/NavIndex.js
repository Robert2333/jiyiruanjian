import React from 'react';
import { View, Text, Button, FlatList, StyleSheet,ListView} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Word from '../word/Word.js'
import ListItem from './component/ListItem/ListItem'
import { inject, observer } from 'mobx-react'

@inject(stores => ({
  path: stores.main.path,
  setPath: stores.main.setPath,
}))
@observer
class HomeScreen extends React.Component {

  static navigationOptions = {
    title: '单词列表',
  };

 getData=()=> {
    return fetch('https://citynotes.cn/getContent',{
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({dataSource:result})
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //url https://citynotes.cn/getContent
  componentDidMount=()=>{
    
    alert(this.props.path.path);
    if(this.props.path!==''&&this.props.path!==undefined){
      alert('1111');
      this.props.navigation.navigate('Word',{date:this.props.path.path})
      this.props.setPath({path:''});
    }
    alert('nav')
    this.getData();
  }

  state={dataSource:[]}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item,index }) =><ListItem key={index} date={item.date} index={index} count={item.count}
          navigation={this.props.navigation}/>}
          ItemSeparatorComponent={() => <View  style={styles.separator} />
        }
      
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
