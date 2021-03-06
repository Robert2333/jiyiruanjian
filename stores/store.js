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

    @observable
    path = {path:''};

    @observable
    collectionState = true;


    @observable
    notificationDate={path:''};

    @action
    changeCollectionState=()=>{
        this.collectionState=!this.collectionState;
    }

    @action
    setNotification=(notificationDate)=>{
        //todo 发送消息给后台，然后就可以查询到哪些遗漏，哪些已经记忆过了
        this.notificationDate=notificationDate;
    }

    @action 
    setPath=(path)=>{
        // alert('设置path')
        this.path=path;
    }
    
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