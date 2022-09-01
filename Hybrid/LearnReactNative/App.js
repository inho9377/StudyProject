import React, {useState} from 'react';
import {Button} from 'react-native';
import {SafeAreaView, Text, View, StatusBar} from 'react-native';
import Box from './components/Box';
import Greeting from './components/Greeting';

const App = () => {
  const [visible, setVisible] = useState(true);
  const onPress = () => {
    setVisible(!visible);
  };
  return (
    <>
      <StatusBar backgroundColor="#26a69a" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'blue'}} />
        <View>
          <Button title="토글" onPress={onPress} />
          {/* {visible? <Box rounded={true} size="large" /> : null} */}
          {visible && <Box rounded={true} size="large" />}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
