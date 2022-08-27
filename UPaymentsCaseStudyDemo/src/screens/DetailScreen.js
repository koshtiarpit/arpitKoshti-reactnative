import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

class DetailScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => {}}>
          <Text>Detail Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DetailScreen;
