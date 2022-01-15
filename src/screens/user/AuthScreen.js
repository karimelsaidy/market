import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import Spinner from '../../components/Spinner';
import colors from '../../constants/Colors';
import {signInAction} from '../../stateStore/actions/authActions';

const AuthScreen = props => {
  const [showSpinner, setShowSpinner] = useState(false);
  // log in inputs state
  const [logInState, setLogInState] = useState({
    inputs: {
      email: '',
      password: '',
    },
    isValidInputs: {
      email: false,
      password: false,
    },
  });
  // getting screen height
  const {height} = useWindowDimensions();

  const dispatch = useDispatch();
  // create animation value and interpoalte it
  const translateFromTop = useRef(new Animated.Value(-100)).current;
  const translateFromBottom = translateFromTop.interpolate({
    inputRange: [-200, 0],
    outputRange: [height + 200, 0],
  });

  useEffect(() => {
    Animated.timing(translateFromTop, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  });
  // handle text input change
  const inputChangeHandler = useCallback((value, valid, id) => {
    setLogInState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [id]: value,
      },
      isValidInputs: {
        ...prevState.isValidInputs,
        [id]: valid,
      },
    }));
  }, []);
  const logInHandler = async (email, password) => {
    if (!logInState.isValidInputs.email || !logInState.isValidInputs.password) {
      Alert.alert('invalid inputs', 'please enter a valid email and password', [
        {text: 'ok'},
      ]);
      return;
    }
    try {
      setShowSpinner(true);
      await dispatch(signInAction(email, password));
      setShowSpinner(false);
      props.navigation.navigate('shop');
    } catch (e) {
      setShowSpinner(false);
      if (e.message === 'invalid') {
        Alert.alert(
          'Invalid Login',
          ' Your email address and / or password could not be validated. Please check them and try again',
          [{text: 'ok'}],
        );
      } else {
        Alert.alert(
          'Error occuerd',
          ' please check your internet connection and try again',
          [{text: 'ok'}],
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
      <StatusBar backgroundColor={colors.fourth} />
      <Modal animationType="slide" visible={showSpinner} transparent={true}>
        <Spinner size="large" color={colors.primary} />
      </Modal>
      <Animated.View
        style={{
          ...styles.firstSecCon,
          transform: [{translateY: translateFromTop}],
        }}>
        <View style={styles.firstSec}>
          <Text style={styles.txtLogo}>Market Login</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.secndSecCon,
          transform: [{translateY: translateFromBottom}],
        }}>
        <View style={styles.secndSec}>
          <Input
            id="email"
            label="Email"
            errorMessage="please Enter a valid Email"
            inputChangeHandler={inputChangeHandler}
            required
            email
            color={colors.primary}
          />
          <Input
            id="password"
            label="Password"
            errorMessage="please enter a valid password"
            inputChangeHandler={inputChangeHandler}
            required
            secureTextEntry
            color={colors.primary}
            minLength = '6'
          />
          <View style={styles.btnCon}>
            <Btn
              onPress={() =>
                logInHandler(
                  logInState.inputs.email,
                  logInState.inputs.password,
                )
              }
              style={styles.btnSignIn}>
              <Text style={styles.btnTxt}>log in</Text>
            </Btn>
            <Btn
              onPress={() => props.navigation.navigate('signUp')}
              style={styles.btnSignUp}>
              <Text style={styles.btnTxt}>Sign Up</Text>
            </Btn>
          </View>
        </View>
      </Animated.View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  firstSecCon: {
    flex: 1,
    backgroundColor: colors.third,
  },
  firstSec: {
    flex: 1,
    backgroundColor: colors.fourth,
    borderBottomEndRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  secndSecCon: {
    flex: 3,
    backgroundColor: colors.fourth,
  },
  secndSec: {
    flex: 1,
    paddingTop: '5%',
    paddingLeft: '5%',
    backgroundColor: colors.third,
    borderTopStartRadius: 30,
  },
  txtLogo: {
    fontSize: 20,
    fontFamily: 'Lobster-Regular',
    color: colors.primary,
    padding: 10,
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
});
export default AuthScreen;
