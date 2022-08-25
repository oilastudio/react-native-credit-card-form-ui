import React from 'react';
import { View } from 'react-native';
import CardInput from './CardInput';
import Slick from 'react-native-slick';
const styles = {
  customInput: {
    backgroundColor: 'red'
  },
  inputWrapper: {
    marginHorizontal: 32
  }
};

const TextInput = () => /*#__PURE__*/React.createElement(View, {
  style: styles.inputWrapper
}, /*#__PURE__*/React.createElement(CardInput, {
  style: styles.customInput
}));

const Carousel = ({}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: {
      height: 100
    }
  }, /*#__PURE__*/React.createElement(Slick, null, /*#__PURE__*/React.createElement(TextInput, null), /*#__PURE__*/React.createElement(TextInput, null), /*#__PURE__*/React.createElement(TextInput, null), /*#__PURE__*/React.createElement(CardInput, null)));
};

export default Carousel;
//# sourceMappingURL=Carousel.js.mapCarousel.js.map