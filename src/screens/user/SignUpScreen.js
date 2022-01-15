import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Modal, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import Spinner from '../../components/Spinner';
import {signUpAction} from '../../stateStore/actions/authActions';
import colors from '../../constants/Colors';

const SignUp = props => {
  const [inputsState, setInputsState] = useState({
    inputs: {
      email: '',
      password: '',
      re_password: '',
    },
    inputsValidity: {
      email: false,
      password: false,
      re_password: false,
    },
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  // handle input changing
  const inputChangeHandler = useCallback((value, valid, id) => {
    setInputsState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [id]: value,
      },
      inputsValidity: {
        ...prevState.inputsValidity,
        [id]: valid,
      },
    }));
  }, []);
  // handle sign up process
  const signUp = async (email, password) => {
    // check if the inputs are valid or not first
    if (
      !inputsState.inputsValidity.email ||
      !inputsState.inputsValidity.password ||
      !inputsState.inputsValidity.re_password
    ) {
      Alert.alert(
        'invalid inputs',
        'please input email and password consist of four numbers at least',
        [{text: 'ok'}],
      );
      return;
    }
    try {
      // show spinner 
      setShowSpinner(true);
      await dispatch(signUpAction(email, password));
      setShowSpinner(false);
      // return to log in page
      props.navigation.navigate('shop');
    } catch (e) {
      setShowSpinner(false);
      if (e.message === 'exist') {
        Alert.alert('Email exist', 'this email is already registerd', [
          {text: 'ok'},
        ]);
      } else if (e.message === 'attempts') {
        Alert.alert('temporary block', 'too many attempts try later', [
          {text: 'ok'},
        ]);
      } else {
        Alert.alert(
          'Network Error',
          'please check your internet connection and try again',
          [{text: 'ok'}],
        );
      }
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
      <LinearGradient
        colors={[colors.fourth, colors.third]}
        style={styles.linearGrad}>
        <Modal animationType="fade" visible={showSpinner} transparent={true}>
          <Spinner size="large" color={colors.primary} />
        </Modal>
        <Input
          id="email"
          label="Email"
          color={colors.primary}
          email
          required
          errorMessage="please Enter a valid email"
          inputChangeHandler={inputChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          color={colors.primary}
          required
          errorMessage="please enter 6 digits at least"
          minLength="6"
          secureTextEntry
          inputChangeHandler={inputChangeHandler}
        />
        <Input
          id="re_password"
          label="re-enter Password"
          color={colors.primary}
          required
          errorMessage="password doesn't match"
          secureTextEntry
          inputChangeHandler={inputChangeHandler}
          enterd={inputsState.inputs.password}
        />
        <View style={styles.btnCon}>
          <Btn
            style={styles.btnSignUp}
            onPress={() =>
              signUp(inputsState.inputs.email, inputsState.inputs.password)
            }>
            <Text style={styles.btnTxt}> Sign Up</Text>
          </Btn>
          <View style={styles.signInCon}>
            <Text style={styles.txtLogIn}> Already have an account ? </Text>
            <Btn onPress={() => props.navigation.navigate('authinticate')}>
              <Text style={styles.btnLogIn}>Log In</Text>
            </Btn>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  linearGrad: {
    flex: 1,
    padding: '5%',
  },
  btnCon: {
    marginVertical: 10,
    paddingRight: '5%',
  },
  btnSignIn: {
    padding: 20,
    backgroundColor: colors.accentColor,
  },
  btnSignUp: {
    padding: 20,
    backgroundColor: colors.faceBook,
    marginVertical: 10,
  },
  btnTxt: {
    color: colors.primary,
    fontFamily: 'Merriweather-Regular',
    textAlign: 'center',
  },
  signInCon: {
    flexDirection: 'row',
    marginVertical: '2%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogIn: {
    color: colors.primary,
  },
  btnLogIn: {
    marginHorizontal: 10,
    color: colors.primary,
    fontSize: 18,
  },
});
export default SignUp;
