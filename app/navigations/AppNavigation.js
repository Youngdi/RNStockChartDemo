import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chart from '../containers/Chart';
import PieChart from '../containers/PieChart';
import StockChart from '../containers/StockChart';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = { 'Chart': 'linechart', 'Stock': 'areachart', 'Pie': 'piechart' }[route.name]
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Chart" component={Chart} />
        <Tab.Screen name="Pie" component={PieChart} />
        <Tab.Screen name="Stock" component={StockChart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}