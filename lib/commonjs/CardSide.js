"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardSideEnum = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CardSideEnum = {
  FRONT: 'FRONT',
  BACK: 'BACK'
};
exports.CardSideEnum = CardSideEnum;

const CardSide = ({
  children,
  style = [],
  background = '#612F74',
  ...props
}) => {
  const SideBackground = _react.default.useCallback(({
    children: child
  }) => {
    return typeof background === 'string' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        borderRadius: 9,
        backgroundColor: background
      }
    }, child) : /*#__PURE__*/_react.default.cloneElement(background, {
      children: child
    });
  }, [background]);

  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({
    style: [styles.sideWrapper, ...style]
  }, props), /*#__PURE__*/_react.default.createElement(SideBackground, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, children)));
};

const styles = _reactNative.StyleSheet.create({
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

var _default = CardSide;
exports.default = _default;
//# sourceMappingURL=CardSide.js.map