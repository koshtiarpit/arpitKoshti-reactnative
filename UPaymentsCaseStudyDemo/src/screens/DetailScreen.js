import axios from 'axios';
import React, {Component} from 'react';
import {Dimensions, Text, TouchableOpacity, View, Image, ActivityIndicator} from 'react-native';
import {access_token} from '../Constants';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      product: {},
    };
  }

  componentDidMount() {
    this.goForAxiosProduct(this.props.route.params.item._id);
  }

  goForAxiosProduct = _id => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `https://upayments-studycase-api.herokuapp.com/api/products/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        // console.log(
        //   'getting products details from axios',
        //   JSON.stringify(response.data.product, null, 2),
        // );
        setTimeout(() => {
          this.setState({
            loading: false,
            product: response.data.product,
          });
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator color={'black'} size={32} style={{flex: 1}} />;
    }
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          resizeMode="contain"
          onError={() => this.goForAxiosProducts()}
          style={{
            width: '90%',
            height: Dimensions.get('screen').width * 0.9,
            alignSelf: 'center',
            marginTop: '5%',
          }}
          source={{uri: this.state.product.avatar}}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: '4%',
            paddingTop: '3%',
            backgroundColor: 'black',
          }}
          onPress={() => {}}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: '5%',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{`${
              this.state.product.name || ''
            }`}</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {this.state.product.price ? `$${this.state.product.price}` : ''}
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              textAlign: 'justify',
              marginTop: '3%',
              marginBottom: '10%',
            }}>{`${this.state.product.description || ''}`}</Text>
        </View>
      </View>
    );
  }
}

export default DetailScreen;
