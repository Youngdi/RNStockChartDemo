import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    processColor,
    SafeAreaView
} from 'react-native';

import { PieChart } from 'react-native-charts-wrapper';

const COLOR_LIST = [
    processColor('lightblue'),
    processColor('lightcoral'),
    processColor('lightsteelblue'),
    processColor('lightslategrey'),
    processColor('lightgray'),
    processColor('lightgreen'),
    processColor('lightpink'),
    processColor('lightsalmon'),
    processColor('lightseagreen'),
    processColor('lightskyblue'),
]
const dataSets = [{
    values: [
        { value: 5023, label: 'AAPL\n5023$' },
        { value: 3012, label: 'AMZN\n3012$' },
        { value: 2000, label: 'GOOGL\n2000$' },
        { value: 3000, label: 'FB\n3000$' },
        { value: 1500, label: 'BABA\n1500$' },
        { value: 7000, label: 'NFLX\n7000$' },
        { value: 2310, label: 'TSLA\n2310$' },
        { value: 3333, label: 'NVDA\n333$' },
        { value: 4445, label: 'AMD\n4445$' },
        { value: 8888, label: 'SPY\n8888$' },
    ],
    config: {
        colors: COLOR_LIST,
        valueTextSize: 10,
        valueTextColor: processColor('#000'),
        sliceSpace: 5,
        selectionShift: 60,
        valueFormatter: "#.#'%'",
        valueLineColor: processColor('#000'),
        valueLinePart1Length: 0.75,
        valueLinePart2Length: 0.1,
        valueLineWidth: 0.5,
        xValuePosition: "OUTSIDE_SLICE",
        valueLineVariableLength: true,
        highlightEnabled: true,
    },
    label: ''
}];
const PieChartScreen = () => {
    const PieRef = React.createRef();
    const [legend, setLegend] = useState({
        enabled: false,
        textSize: 10,
        form: 'CIRCLE',
        horizontalAlignment: "CENTER",
        verticalAlignment: "BOTTOM",
        orientation: "HORIZONTAL",
        wordWrapEnabled: true,
        custom: {
            colors: dataSets[0].config.colors,
            labels: dataSets[0].values.map(i => i.label)
        },
        drawInside: true,
        xEntrySpace: 10,
        yEntrySpace: 15,
    })
    const handleSelect = (event) => {
        let entry = event.nativeEvent
        const { label } = entry;
        console.log(entry)
        // setLegend({ ...legend, custom: { colors: [], labels: [] } })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'snow' }}>
            <View style={styles.container}>
                <View style={styles.title}><Text style={{ fontSize: 26 }}>{'投資組合'}</Text></View>
                <PieChart
                    highlightPerTapEnabled={false}
                    ref={PieRef}
                    rotationEnabled={true}
                    style={styles.chart}
                    logEnabled={false}
                    chartDescription={{
                        text: '',
                    }}
                    data={{ dataSets }}
                    legend={legend}
                    entryLabelColor={processColor('#000')}
                    entryLabelTextSize={12}
                    drawEntryLabels={true}
                    rotationAngle={0}
                    usePercentValues={true}
                    styledCenterText={{ text: `${dataSets[0].values.reduce((acc, val) => acc + val.value, 0)} $`, color: processColor('#000'), size: 16 }}
                    centerTextRadiusPercent={100}
                    holeRadius={30}
                    holeColor={processColor('#f0f0f0')}
                    transparentCircleRadius={35}
                    transparentCircleColor={processColor('#f0f0f088')}
                    maxAngle={360}
                    onSelect={handleSelect}
                    onChange={(event) => console.log(event.nativeEvent)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.5,
    },
    chart: {
        flex: 1
    },
    title: {
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
});

export default PieChartScreen;