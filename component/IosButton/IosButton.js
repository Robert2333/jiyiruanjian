import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native'
export default class IosButton extends React.PureComponent {
    render() {
        //#fff0
        return (
            
            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 10,borderColor:'white', borderWidth:1,width: 120 ,height:40}}>
                <Button title={this.props.title}
                    color={this.props.color}
                    style={this.props.style}
                    onPress={this.props.onPress} />
            </TouchableOpacity>
        )
    }
}