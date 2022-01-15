import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
const Spinner = props => {
  return (
    <View style={{...styles.spinnerCon, ...props.style}}>
      <ActivityIndicator
        size={props.size ? props.size : 'large'}
        color={props.color ? props.color : colors.accentColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Spinner;
