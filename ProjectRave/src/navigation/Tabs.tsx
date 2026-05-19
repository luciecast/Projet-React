import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../components/Home';
import Record from '../components/Record';
import Rave from '../components/Rave';

export type RootTabParamList = {
  Home: undefined;
  Record: undefined;
  RAVE: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Record" component={Record} />
      <Tab.Screen name="RAVE" component={Rave} />
    </Tab.Navigator>
  );
}
