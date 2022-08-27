import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Detail')}>
          <Text>Home Screen</Text>
        </TouchableOpacity>
        <FloatingAction
          ref={ref => {
            this.floatingAction = ref;
          }}
          color={'white'}
          floatingIcon={<Icon name={'add'} size={32} />}
          onOpen={() => {
            this.floatingAction?.animateButton();
            this.props.navigation.navigate('Create');
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;
