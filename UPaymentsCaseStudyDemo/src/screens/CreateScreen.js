import axios from 'axios';
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  AlertIOS,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../ColorConstants';
import {access_token} from '../Constants';

class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
      name: '',
      category: '',
      price: '',
      description: '',
      avtar: '',
      developerEmail: 'koshtiarpit@gmail.com',
    };
  }

  componentDidMount() {
    this.goForAxiosCategories();
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
            categories: response.data.categories,
          });
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  addProduct = () => {
    let {name, price, category, description, avtar, developerEmail} =
      this.state;

    if (
      name.length <= 0 ||
      !Number.parseInt(price, 10) ||
      category.length <= 0 ||
      description <= 0 ||
      avtar <= 0
    ) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please enter all the details correctly',
          ToastAndroid.SHORT,
        );
        return;
      } else {
        AlertIOS.alert('Please enter all the details correctly');
        return;
      }
    }
    let payload = {
      Name: name,
      Price: Number.parseInt(price, 10),
      Category: category,
      Description: description,
      Avtar: avtar,
      DeveloperEmail: developerEmail,
    };
    alert(JSON.stringify(payload, null, 2));
    this.setState({loading: true});
    axios
      .post(
        'https://upayments-studycase-api.herokuapp.com/api/products',
        payload,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(response => {
        console.log(
          'adding product from axios',
          JSON.stringify(response.data, null, 2),
        );
        setTimeout(() => {
          if (response.data.statusCode === 200) {
            alert('Product added successfully');
            this.props.navigation.goBack();
          } else {
            alert(JSON.stringify(response.data, null, 2));
          }
          this.setState({loading: false});
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderCategoryItem = name => {
    return (
      <View style={styles.categoryCardStyle(this.state.category === name)}>
        <TouchableOpacity onPress={() => this.setState({category: name})}>
          <Text style={styles.categoryTextStyle(this.state.category === name)}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
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
        <Text style={styles.labelTextStyle}>
          {this.state.name.length > 0 ? 'Product title' : ''}
        </Text>
        <TextInput
          style={styles.valueTextStyle}
          value={this.state.name}
          placeholder={'Product title'}
          onChangeText={value => this.setState({name: value})}
        />
        <Text style={styles.labelTextStyle}>
          {this.state.price ? 'Price' : ''}
        </Text>
        <TextInput
          style={styles.valueTextStyle}
          keyboardType={'numeric'}
          textContentType={'telephoneNumber'}
          value={this.state.price}
          placeholder={'Price'}
          onChangeText={value =>
            this.setState({
              price: value,
            })
          }
        />
        <Text style={styles.labelTextStyle}>
          {this.state.description.length > 0 ? 'Description' : ''}
        </Text>
        <TextInput
          style={[styles.valueTextStyle, styles.textAlignTop]}
          numberOfLines={3}
          value={this.state.description}
          placeholder={'Description'}
          onChangeText={value => this.setState({description: value})}
        />
        <Text style={styles.labelTextStyle}>
          {this.state.avtar.length > 0 ? 'Image Link' : ''}
        </Text>
        <TextInput
          style={styles.valueTextStyle}
          value={this.state.avtar}
          placeholder={'Image Link'}
          onChangeText={value => this.setState({avtar: value})}
        />
        <Text style={styles.selectedCategoryTextStyle}>
          {`Selected Category : ${this.state.category}`}
        </Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesFlatlistStyle}
          contentContainerStyle={styles.categoriesContentContainerStyle}
          data={this.state.categories}
          renderItem={({item}) => this.renderCategoryItem(item.name)}
        />
        <View
          style={[
            styles.categoryCardStyle(true),
            styles.extraCategoryCardStyle,
          ]}>
          <TouchableOpacity onPress={() => this.addProduct()}>
            <Text style={styles.categoryTextStyle(true)}>{'Add Product'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: '2%',
    backgroundColor: colors.white,
    minHeight: Dimensions.get('screen').height,
  },
  labelTextStyle: {
    marginTop: '1%',
    marginStart: '2%',
  },
  valueTextStyle: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: '1%',
    paddingLeft: '2%',
  },
  activityIndicatorStyle: {
    flex: 1,
  },
  categoriesFlatlistStyle: {
    flexGrow: 0,
    height: '10%',
  },
  categoriesContentContainerStyle: {
    paddingVertical: 15,
  },
  categoryTextStyle: condition => ({
    fontSize: 14,
    marginHorizontal: 10,
    color: condition ? colors.white : colors.black,
  }),
  categoryCardStyle: condition => ({
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: condition ? colors.black : colors.white,
  }),
  selectedCategoryTextStyle: {
    marginTop: '5%',
    marginStart: '2%',
    color: colors.black,
  },
  extraCategoryCardStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: '3%',
    position: 'absolute',
    bottom: 80,
  },
  textAlignTop: {
    textAlignVertical: 'top',
  },
});

export default CreateScreen;
