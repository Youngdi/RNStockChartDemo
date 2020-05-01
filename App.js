/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import Main from './app/navigations/AppNavigation';
import { StatusBar } from 'react-native';
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <Main />
    </>
  );
};

export default App;
