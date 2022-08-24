import React from 'react';
import { View } from 'react-native';
import CardInput from './CardInput';
import Slick from 'react-native-slick';
const styles = {
  customInput: {
    backgroundColor: 'red',
  },
  inputWrapper: {
    marginHorizontal: 32,
  },
};
const TextInput = () =>
  React.createElement(
    View,
    { style: styles.inputWrapper },
    React.createElement(CardInput, { style: styles.customInput })
  );
const Carousel = ({}) => {
  return React.createElement(
    View,
    { style: { height: 100 } },
    React.createElement(
      Slick,
      null,
      React.createElement(TextInput, null),
      React.createElement(TextInput, null),
      React.createElement(TextInput, null),
      React.createElement(CardInput, null)
    )
  );
};
export default Carousel;
