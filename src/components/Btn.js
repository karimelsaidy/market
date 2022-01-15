import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

const ANDROID_API = 21;

function Btn(props) {
  if (Platform.OS === 'android' && Platform.Version >= ANDROID_API) {
    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.Ripple(
          'rgba(0, 0, 0, .33)',
          false,
        )}>
        <View style={props.style}>{props.children}</View>
      </TouchableNativeFeedback>
    );
  }

  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
}

export default Btn;
