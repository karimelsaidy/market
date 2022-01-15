import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  
} from 'react-native';
import Colors from '../constants/Colors';
const ShopCard = props => {
  // get dimensions of the screen to set the image height
  const {width, height} = useWindowDimensions();
  return (
    <View style={{...styles.card, width: width * 0.9}}>
      <TouchableOpacity
        style={styles.bgImgContainer}
        activeOpacity={0.5}
        onPress={() => {
          props.navigation.navigate('productDetailScreen', {
            id: props.id,
            title: props.title,
          });
        }}>
        <Image
          resizeMode="stretch"
          style={{...styles.bgImg, height: height * 0.3}}
          source={{uri: props.imageUrl}}
        />
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={styles.titleCon}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              props.navigation.navigate('productDetailScreen', {
                id: props.id,
                title: props.title,
              });
            }}>
            <Text style={styles.btn}>Details</Text>
          </TouchableOpacity>
          <View style={styles.actionPrice}>
            <Text style={styles.price}>{props.price} $</Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => props.addToCard(props.id)}>
            <Text style={styles.btn}>To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
    overflow: 'hidden',
    margin: 10,
  },
  bgImgContainer: {width: '100%'},
  bgImg: {width: '100%', height: '100%'},
  actionBar: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-around',
    backgroundColor: Colors.accentColor,
    borderBottomStartRadius: 15,
  },
  actionButton: {
    padding: 8,
  },
  actionPrice: {
    padding: 8,
  },
  btn: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: 'Merriweather-Regular',
    elevation: 7,
  },
  price: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
  },
  titleCon: {
    alignItems: 'center',
    paddingTop: 5,
  },
  title: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
  },
  footer: {
    backgroundColor: Colors.accentColor,
    borderBottomStartRadius: 15,
    overflow: 'hidden',
  },
});

export default ShopCard;
