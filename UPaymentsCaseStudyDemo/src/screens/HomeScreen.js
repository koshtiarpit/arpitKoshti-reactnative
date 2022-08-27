import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View, Image, ActivityIndicator} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {access_token} from '../Constants';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
      products: [],
      selectedCategory: 'All',
    };
  }

  componentDidMount() {
    this.goForAxiosCategories();
    this.goForAxiosProducts();
  }

  goForAxiosCategories = () => {
    this.setState({
      loading: true,
    });
    axios
      .get('https://upayments-studycase-api.herokuapp.com/api/categories/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        // console.log(
        //   'getting categories data from axios',
        //   JSON.stringify(response.data.categories, null, 2),
        // );
        setTimeout(() => {
          this.setState({
            loading: false,
            categories: [{name: 'All'}, ...response.data.categories],
          });
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  goForAxiosProducts = () => {
    this.setState({
      loading: true,
    });
    axios
      .get('https://upayments-studycase-api.herokuapp.com/api/products', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => {
        // console.log(
        //   'getting products data from axios',
        //   JSON.stringify(response.data.categories, null, 2),
        // );
        setTimeout(() => {
          this.setState({
            loading: false,
            products: response.data.products,
          });
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderCategoryItem = name => {
    return (
      <View
        style={{
          borderWidth: 2,
          justifyContent: 'center',
          marginHorizontal: 5,
          borderRadius: 10,
          backgroundColor:
            this.state.selectedCategory === name ? 'white' : 'black',
        }}>
        <TouchableOpacity
          onPress={() => this.setState({selectedCategory: name})}>
          <Text
            style={{
              fontSize: 14,
              color: this.state.selectedCategory === name ? 'black' : 'white',
              marginHorizontal: 10,
            }}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderProductItem = item => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Detail', {item})}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: '2%',
          marginRight: '2%',
          width: '48%',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          onError={() => this.goForAxiosProducts()}
          style={{width: 100, height: 100, alignSelf: 'center', margin: '5%'}}
          source={{uri: item.avatar}}
        />
        <View style={{backgroundColor: 'black', padding: 5, borderRadius: 5}}>
          <Text style={{flex: 1, color: 'white'}}>{item.name}</Text>
          <Text style={{flex: 1, color: 'white'}}>{`$${item.price}`}</Text>
          <Image
            resizeMode="contain"
            onError={() => this.goForAxiosProducts()}
            style={{
              position: 'absolute',
              width: 30,
              height: 25,
              bottom: 10,
              right: 10,
              // margin: '5%',
            }}
            source={require('../assets/pencil.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator color={'black'} size={32} style={{flex: 1}} />;
    }
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            flexGrow: 0,
            height: '10%',
          }}
          contentContainerStyle={{
            padding: 10,
            paddingVertical: 15,
          }}
          data={this.state.categories}
          renderItem={({item}) => this.renderCategoryItem(item.name)}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{
            flexGrow: 0,
          }}
          contentContainerStyle={{
            paddingVertical: 5,
            paddingLeft: '2%',
          }}
          numColumns={2}
          data={
            this.state.selectedCategory === 'All'
              ? this.state.products
              : this.state.products.filter(
                  item => item.category === this.state.selectedCategory,
                )
          }
          renderItem={({item}) => this.renderProductItem(item)}
        />
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
