import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
const CustomButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.btn, ...props.btnStyle}}
      onPress={props.onPress}>
      <Text style={{...styles.btnTxt, ...props.btnTxtStyle}}>
        {' '}
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.third,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  btnTxt: {
    color: colors.accentColor,
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
  },
});
export default CustomButton;
