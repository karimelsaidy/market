import React, {
  useRef,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import Input from '../../components/Input';
import addNewProductAction from '../../stateStore/actions/addNewProductAction';
import editProductAction from '../../stateStore/actions/editProductAction';
import Spinner from '../../components/Spinner';

// actions for form state
const Actions = {
  FORM_UPDATE: 'FORM_UPDATE',
  FOCUSE: 'FOCUSE',
  REMOVE_FOCUSE: 'REMOVE_FOCUSE',
};
// form state management
const formReducer = (state, action) => {
  switch (action.type) {
    case Actions.FORM_UPDATE:
      const updatedInputsValues = {
        ...state.inputsValues,
        [action.id]: action.value,
      };
      const updatedValidInputs = {
        ...state.validInputs,
        [action.id]: action.isValid,
      };
      let updateIsValidForm = true;
      for (let key in updatedValidInputs) {
        updateIsValidForm = updateIsValidForm && updatedValidInputs[key];
      }
      return {
        ...state,
        inputsValues: updatedInputsValues,
        validInputs: updatedValidInputs,
        isValidForm: updateIsValidForm,
      };
    default:
      return state;
  }
};

const EditProduct = props => {
  const [isLoading, setIsLoading] = useState(false);

  // get the product id that will be edited
  const editedProductId = props.navigation.getParam('id');
  // get the product by the id
  const product = useSelector(state =>
    state.products.allProducts.find(product => product.id === editedProductId),
  );
  const userId = useSelector(state=>state.auth.userId)

  // using use reducer to manage the form state
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputsValues: {
      title: '',
      description: '',
      price: '',
      imageUrl: '',
    },
    validInputs: {
      title: false,
      description: false,
      price: false,
      imageUrl: false,
    },
    isValidForm: false,
  });

  const inputChangeHandler = useCallback(
    (value, isValid, id) => {
      dispatchFormState({type: Actions.FORM_UPDATE, value, isValid, id});
    },
    [dispatchFormState],
  );

  // make reference to inputs to focus in them after editing the input before them
  const descreptionRef = useRef();
  const priceRef = useRef();
  const imageUrlRef = useRef();

  const dispatch = useDispatch();
  const dispatchStoreHandler = useCallback(async () => {
    if (!formState.isValidForm) {
      Alert.alert('Invalid Inputs', 'please check the errors', [{text: 'Ok'}]);
      return;
    }
    try {
      setIsLoading(true);
      if (editedProductId) {
        await dispatch(
          editProductAction({
            id: editedProductId,
            product: {
              id: editedProductId,
              title: formState.inputsValues.title,
              imageUrl: formState.inputsValues.imageUrl,
              description: formState.inputsValues.description,
              price: Number(formState.inputsValues.price),
            },
          }),
        );

        props.navigation.navigate('myProducts');
      } else {
        await dispatch(
          addNewProductAction({
            ownerId: userId,
            title: formState.inputsValues.title,
            imageUrl: formState.inputsValues.imageUrl,
            description: formState.inputsValues.description,
            price: Number(formState.inputsValues.price),
          }),
        );
      }
      props.navigation.navigate('myProducts');
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Network Error', 'please check your internet connection', [
        {text: 'ok'},
      ]);
    }
    setIsLoading(false);
  }, [
    formState.inputsValues.title,
    formState.inputsValues.imageUrl,
    formState.inputsValues.description,
    formState.inputsValues.imageUrl,
    formState.isValidForm,
  ]);

  useEffect(() => {
    props.navigation.setParams({dispatchStoreHandler});
  }, [dispatchStoreHandler]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <KeyboardAwareScrollView>
      <View>
        <Input
          id="title"
          label="Title"
          initialValue={editedProductId ? product.title : ''}
          initalValid={editedProductId ? true : false}
          errorMessage="please write a valid title"
          required
          inputChangeHandler={inputChangeHandler}
          onSubmitEditing={() => descreptionRef.current.focus()}
          returnKeyType="next"
        />
        <Input
          ref={descreptionRef}
          id="description"
          label="description"
          initialValue={editedProductId ? product.description : ''}
          initalValid={editedProductId ? true : false}
          errorMessage="description should be four letters at Least"
          required
          minLength="4"
          inputChangeHandler={inputChangeHandler}
          multiline
          onSubmitEditing={() => priceRef.current.focus()}
        />
        <Input
          ref={priceRef}
          id="price"
          label="price"
          initialValue={editedProductId ? product.price.toString() : ''}
          initalValid={editedProductId ? true : false}
          errorMessage="please write a valid price using only numbers"
          minLength="0"
          required
          isNumber={true}
          inputChangeHandler={inputChangeHandler}
          onSubmitEditing={() => imageUrlRef.current.focus()}
          returnKeyType="next"
        />
        <Input
          ref={imageUrlRef}
          id="imageUrl"
          label="image Url"
          initialValue={editedProductId ? product.imageUrl : ''}
          initalValid={editedProductId ? true : false}
          errorMessage="please write a valid Url to your Image"
          required
          isUrl={true}
          inputChangeHandler={inputChangeHandler}
          returnKeyType="done"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
EditProduct.navigationOptions = navigationData => {
  return {
    title: navigationData.navigation.getParam('id')
      ? 'Edit Product'
      : 'Add  Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName="shield-checkmark"
          iconSize={30}
          onPress={navigationData.navigation.getParam('dispatchStoreHandler')}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProduct;
