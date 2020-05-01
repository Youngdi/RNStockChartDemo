/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    processColor,
    SafeAreaView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { LineChart } from 'react-native-charts-wrapper';
import * as R from 'ramda';
import DATA from '../constants/data.json';
import ChartToolBar from '../components/ChartToolBar';

const era = moment('1970-01-01', 'YYYY-MM-DD')

const getMarker = (value, date) => `${value} \n ${date}`
const formatingData = data => key =>
    R.map(
        R.applySpec({
            y: R.prop(key),
            x: R.pipe(
                R.prop('Dates'),
                (date) => moment(date, "YYYY/MM/DD").diff(era, 'days')
            ),
            marker: R.converge(getMarker, [R.prop(key), R.prop('Dates')]),
        }),
        data,
    );
const BTN_LIST = [{ text: '1D', value: 1 }, { text: '5D', value: 5 }, { text: '1M', value: 30 }, { text: '3M', value: 90 }, { text: '6M', value: 180 }, { text: '1Y', value: 365 }, { text: '5Y', value: 1825 }]

const chartDataSetConfig = {
    drawCircles: false,
    mode: 'LINEAR',
    highlightLineWidth: 1,
    drawVerticalHighlightIndicator: true,
    drawHorizontalHighlightIndicator: true,
    drawHighlightIndicators: true,
    drawValues: false,
    drawFilled: true,
    fillAlpha: 1,
    lineWidth: 2,
}

const Chart: () => React$Node = () => {
    const ChartRef = React.createRef();
    const [dayRange, setDayRange] = useState(moment().diff(era, 'days') - 1825)
    const [valueFormatterPattern, setValueFormatterPattern] = useState('yyyy')
    const [labelCount, setLabelCount] = useState(3);

    const dataSets = [
        { label: 'Original', color: processColor('crimson'), fillColor: processColor('crimson') },
        { label: 'Optimal_1', color: processColor('royalblue'), fillColor: processColor('royalblue') },
        { label: 'Optimal_2', color: processColor('seagreen'), fillColor: processColor('seagreen') }
    ].map(i => (
        {
            label: i.label,
            values: formatingData(DATA)(i.label).filter(i => i.x >= dayRange),
            config: {
                ...chartDataSetConfig,
                color: i.color,
                fillColor: i.fillColor
            }
        }
    ))

    const handleChartOnChange = event => {
        console.log(event.nativeEvent)
        const { action, scaleX } = event.nativeEvent;
        if (action == 'chartScaled') {
            const xRatio = Math.round(scaleX * 100) / 100
            setValueFormatterPattern(xRatio > 2.5 ? 'MM-dd' : 'yyyy')
            setLabelCount(xRatio > 4 ? 6 : 3)
        }
    }
    const handleRefresh = () => {
        ChartRef?.current?.highlights([]);
        ChartRef?.current?.fitScreen();
        setValueFormatterPattern('yyyy')
        setLabelCount(3)
    }

    const handleSelect = event => {
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        };
        ReactNativeHapticFeedback.trigger("impactLight", options);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ChartToolBar
                list={BTN_LIST}
                setDayRange={(val) => {
                    ChartRef?.current?.highlights([]);
                    ChartRef?.current?.fitScreen();
                    setDayRange(val)
                }
                }
                value={dayRange}
            />
            <TouchableWithoutFeedback onLongPress={() => { }}>
                <View style={styles.container}>
                    {dataSets[0].values.length == 0 ?
                        <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{"No Data available"}</Text>
                        </View> :
                        <LineChart
                            chartDescription={{ text: '' }}
                            marker={{
                                enabled: true,
                                markerColor: processColor('#ffd700'),
                                textColor: processColor('#000'),
                                textSize: 12,
                            }}
                            xAxis={{
                                position: 'BOTTOM',
                                drawLabels: true,
                                granularity: 1,
                                granularityEnabled: true,
                                textSize: 8,
                                slice: 1,
                                labelCount,
                                valueFormatter: 'date',
                                valueFormatterPattern,
                                timeUnit: 'DAYS'
                            }}
                            yAxis={{ position: 'OUTSIDE_CHART' }}
                            ref={ChartRef}
                            doubleTapToZoomEnabled={false}
                            dragDecelerationEnabled={false}
                            dragDecelerationFrictionCoef={0.99}
                            onSelect={handleSelect}
                            onChange={handleChartOnChange}
                            zoom={{ scaleX: 1, scaleY: 1, xValue: 0, yValue: 0 }}
                            visibleRange={{
                                x: {
                                    min: 0,
                                },
                                y: {
                                    min: 0,
                                    max: 50,
                                }
                            }}
                            style={styles.chart}
                            data={{
                                dataSets
                            }}
                        />
                    }
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
                style={styles.refresh}
                onPress={handleRefresh}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            >
                <FeatherIcon name={'refresh-cw'} size={30} />
                <Text>Refresh</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
    chart: {
        flex: 1,
    },
    refresh: {
        marginTop: 30, width: '100%', alignItems: 'center'
    }
});

export default Chart;
