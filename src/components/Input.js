import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/Colors';

const Input = React.forwardRef((props, ref) => {
  // define input state
  const [inputState, setInputState] = useState({
    value: props.initialValue,
    isValid: props.initalValid,
    touched: props.initalValid,
    focused: false,
    
  });
  // destruct the id and changeHandler from props
  const {id, inputChangeHandler} = props;

  // check if the input text valid or not
  const textChangeHandler = text => {
    // regex to check email
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // regex to check url
      const urlRegex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (+props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < +props.minLength) {
      isValid = false;
    }
    if (props.isNumber && !Number(text)) {
      isValid = false;
    }
    if (props.isUrl && !urlRegex.test(text)) {
      isValid = false;
    }
    if(props.enterd && props.enterd !== text){
      isValid = false;
    }
    setInputState(prevState => ({...prevState, value: text, isValid}));
  };
  // set input state to the parent component
  useEffect(() => {
    if (inputState.touched) {
      inputChangeHandler(inputState.value, inputState.isValid, id);
    }
  }, [inputChangeHandler, inputState, id]);
  return (
    <View style={styles.section}>
      <Text style={styles.txt}>{props.label}</Text>
      <TextInput
        ref={ref}
        style={{
          ...styles.txtInp,
          borderBottomColor: inputState.focused ? colors.fourth : colors.fifth,
        }}
        
        onFocus={() =>
          setInputState(prevState => ({
            ...prevState,
            touched: true,
            focused: true,
          }))
        }
        onBlur={() =>
          setInputState(prevState => ({
            ...prevState,
            focused: false,
          }))
        }
        value={inputState.value}
        onChangeText={textChangeHandler}
        blurOnSubmit={false}
        {...props}
      />
      {inputState.touched && !inputState.isValid && (
        <View style={styles.errorCon}>
          <Icon name="md-information-circle" size={20} color={colors.delete} />
          <Text style={styles.errorTxt}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginVertical: '5%',
  },
  txt: {
    fontFamily: 'Merriweather-Regular',
    fontSize: 16,
    color: colors.accentColor,
    marginStart: '2%',
  },
  txtInp: {
    borderBottomWidth: 3,
    marginEnd: '3%',
    marginStart: '7%',
  },
  errorCon: {
    flexDirection: 'row',
    marginStart: '5%',
    marginTop: 3,
  },
  errorTxt: {
    color: colors.delete,
    fontSize: 14,
    marginStart: '2%',
  },
});
export default Input;
