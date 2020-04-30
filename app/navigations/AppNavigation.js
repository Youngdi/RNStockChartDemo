import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chart from '../containers/Chart';
import PieChart from '../containers/PieChart';
import StockChart from '../containers/StockChart';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Chart" component={Chart} />
        <Tab.Screen name="Stock" component={StockChart} />
        <Tab.Screen name="Pie" component={PieChart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}