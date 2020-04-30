/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    processColor,
    Vibration
} from 'react-native';
import moment from 'moment';


const ToolBarButton: () => React$Node = ({ text, onPress, isSelected }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        >
            <Text style={{ color: isSelected ? 'blue' : 'black' }} >{text}</Text>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        color: '#fff'
    },
});

export default ToolBarButton;
