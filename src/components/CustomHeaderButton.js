import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors';

const CustomHeaderButton = (props) => {
    return (
       <HeaderButton IconComponent={Icon} iconSize={25} {...props} color={Colors.primary} />
    )
}

export default CustomHeaderButton
