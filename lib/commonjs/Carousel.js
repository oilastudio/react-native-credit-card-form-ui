"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _CardInput = _interopRequireDefault(require("./CardInput"));

var _reactNativeSlick = _interopRequireDefault(require("react-native-slick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = {
  customInput: {
    backgroundColor: 'red'
  },
  inputWrapper: {
    marginHorizontal: 32
  }
};

const TextInput = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
  style: styles.inputWrapper
}, /*#__PURE__*/_react.default.createElement(_CardInput.default, {
  style: styles.customInput
}));

const Carousel = ({}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height: 100
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSlick.default, null, /*#__PURE__*/_react.default.createElement(TextInput, null), /*#__PURE__*/_react.default.createElement(TextInput, null), /*#__PURE__*/_react.default.createElement(TextInput, null), /*#__PURE__*/_react.default.createElement(_CardInput.default, null)));
};

var _default = Carousel;
exports.default = _default;
//# sourceMappingURL=Carousel.js.mapCarousel.js.map