import axios from 'axios';
import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {colors} from '../ColorConstants';
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
      return (
        <ActivityIndicator
          color={colors.black}
          size={32}
          style={styles.activityIndicatorStyle}
        />
      );
    }
    return (
      <View style={styles.containerStyle}>
        <Image
          resizeMode="contain"
          onError={() => this.goForAxiosProducts()}
          style={styles.productImageStyle}
          source={{uri: this.state.product.avatar}}
        />
        <View style={styles.bottomViewStyle} onPress={() => {}}>
          <View style={styles.productNameViewStyle}>
            <Text style={styles.nameTextStyle}>{`${
              this.state.product.name || ''
            }`}</Text>
            <Text style={styles.priceTextStyle}>
              {this.state.product.price ? `$${this.state.product.price}` : ''}
            </Text>
          </View>
          <Text style={styles.descriptionTextStyle}>{`${
            this.state.product.description || ''
          }`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  productImageStyle: {
    width: '90%',
    height: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
    marginTop: '5%',
  },
  bottomViewStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: '4%',
    paddingTop: '3%',
    backgroundColor: colors.black,
  },
  productNameViewStyle: {
    flexDirection: 'row',
    marginVertical: '5%',
    justifyContent: 'space-between',
  },
  nameTextStyle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceTextStyle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionTextStyle: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'justify',
    marginTop: '3%',
    marginBottom: '10%',
  },
});

export default DetailScreen;
