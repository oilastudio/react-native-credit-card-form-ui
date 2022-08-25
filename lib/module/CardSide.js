function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// @ts-nocheck
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
export const CardSideEnum = {
  FRONT: 'FRONT',
  BACK: 'BACK'
};
const styles = StyleSheet.create({
  sideWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#f1f1f1',
    borderRadius: 9
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 16
  }
});

const CardSide = ({
  children,
  style = [],
  background = '#612F74',
  ...props
}) => {
  const SideBackground = React.useCallback(({
    children: child
  }) => {
    return typeof background === 'string' ? /*#__PURE__*/React.createElement(View, {
      style: {
        borderRadius: 9,
        backgroundColor: background
      }
    }, child) : /*#__PURE__*/React.cloneElement(background, {
      children: child
    });
  }, [background]);
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [styles.sideWrapper, ...style]
  }, props), /*#__PURE__*/React.createElement(SideBackground, null, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, children)));
};

export default CardSide;
//# sourceMappingURL=CardSide.js.map