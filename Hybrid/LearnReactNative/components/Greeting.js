import React from 'react';
import {View, Text} from 'react-native';

function Greeting(props) {
  const name = 'JSX!';
  return (
    <>
      <View>
        <Text>안녕하세요 {name}!</Text>
      </View>
      <Text>Extra Text!</Text>
    </>
  );
}

Greeting.defaultProps = {
  name: '리액트 네이티브',
};

export default Greeting;
