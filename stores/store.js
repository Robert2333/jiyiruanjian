import { observable, action } from "mobx";
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      height: 80,
      // overflow:'hidden'
    },
    hidden:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: 0,
         overflow:'hidden'
    }
  });
 class Store {
    @observable
    tabState = styles.container;

    @action
    hideTab=()=>{
        this.tabState=styles.hidden;
    }

    @action
    showTab=()=>{
        this.tabState=styles.container;
    }
}
const store=new Store();
export default {main:store}