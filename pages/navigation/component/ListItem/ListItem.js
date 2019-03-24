import React from 'react'
import { TouchableOpacity, View, Text, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class MyListItem extends React.PureComponent {
    _onPress = () => {
        const {date,navigation}=this.props;
        navigation.navigate('Word',{date})
    };

    render() {
        //   const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this._onPress} style={{
                padding: 10,
                height: 46,
            }} key={this.props.index}>
                <View key={this.props.index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' ,alignItems:'center'}}>
                    <Text style={{ fontSize: 18,flex:3 }} key={this.props.index}>{this.props.date}</Text>
                    <View style={{ flex: 1, flexDirection: 'row',alignItems:'flex-end',justifyContent:'flex-end',marginRight:20}}>
                        <Text style={{ fontSize: 18 ,marginRight:18}} >{this.props.count}</Text>
                        <Icon name="arrow-right" size={12} style={{paddingBottom:4}}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
