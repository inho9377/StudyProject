import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Greeting from './components/Greeting';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Greeting />
      </View>
    </SafeAreaView>
  );
};

export default App;
