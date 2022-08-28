import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {access_token} from '../Constants';
import {colors} from '../ColorConstants';

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
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.goForAxiosCategories();
        this.goForAxiosProducts();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
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
        style={styles.categoryCardStyle(this.state.selectedCategory === name)}>
        <TouchableOpacity
          onPress={() => this.setState({selectedCategory: name})}>
          <Text
            style={styles.categoryTextStyle(
              this.state.selectedCategory === name,
            )}>
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
        style={styles.productCardStyle}>
        <Image
          resizeMode={'contain'}
          onError={() => this.goForAxiosProducts()}
          style={styles.productImageStyle}
          source={{uri: item.avatar}}
        />
        <View style={styles.productCardFooterStyle}>
          <Text style={styles.textStyle}>{item.name}</Text>
          <Text style={styles.textStyle}>{`$${item.price}`}</Text>
          <Image
            resizeMode="contain"
            onError={() => this.goForAxiosProducts()}
            style={styles.pencilIconStyle}
            source={require('../assets/pencil.png')}
          />
        </View>
      </TouchableOpacity>
    );
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
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesFlatlistStyle}
          contentContainerStyle={styles.categoriesContentContainerStyle}
          data={this.state.categories}
          renderItem={({item}) => this.renderCategoryItem(item.name)}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.productsFlatlistStyle}
          contentContainerStyle={styles.productsContentContainerStyle}
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
          color={colors.white}
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

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  categoriesFlatlistStyle: {
    flexGrow: 0,
    height: '10%',
  },
  categoriesContentContainerStyle: {
    padding: 10,
    paddingVertical: 15,
  },
  productsFlatlistStyle: {
    flexGrow: 0,
  },
  productsContentContainerStyle: {
    paddingVertical: 5,
    paddingLeft: '2%',
  },
  pencilIconStyle: {
    position: 'absolute',
    width: 30,
    height: 25,
    bottom: 10,
    right: 10,
    // margin: '5%',
  },
  textStyle: {
    flex: 1,
    color: colors.white,
  },
  productCardFooterStyle: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 5,
  },
  productImageStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: '5%',
  },
  productCardStyle: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: '2%',
    marginRight: '2%',
    width: '48%',
    justifyContent: 'center',
  },
  categoryTextStyle: condition => ({
    fontSize: 14,
    marginHorizontal: 10,
    color: condition ? colors.black : colors.white,
  }),
  categoryCardStyle: condition => ({
    borderWidth: 2,
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: condition ? colors.white : colors.black,
  }),
});

export default HomeScreen;
