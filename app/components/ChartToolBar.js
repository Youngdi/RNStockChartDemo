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
import ToolBarButton from './ToorBarButton';
const era = moment('1970-01-01', 'YYYY-MM-DD')

const ChartToolBar: () => React$Node = (props) => (
    <View style={styles.container}>
        {props.list.map(i => <ToolBarButton
            isSelected={props.value == moment().diff(era, 'days') - i.value}
            text={i.text}
            onPress={() => props.setDayRange(moment().diff(era, 'days') - i.value)}
        />)
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        width: Dimensions.get('window').width,
        height: 50,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
});

export default ChartToolBar;
