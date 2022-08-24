"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeMaskedText = require("react-native-masked-text");

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CardInput = ({
  name,
  maskProps,
  refInput,
  onChange = () => {},
  style,
  ...props
}) => {
  const handleChange = _react.default.useCallback(text => {
    const value = text.toUpperCase();
    return onChange(name, value);
  }, [name, onChange]);

  const setRef = (inputRef, ref) => {
    if (typeof ref === 'object') {
      ref.current = inputRef;
    }
  };

  const InputComponent = maskProps ? _reactNativeMaskedText.TextInputMask : _reactNative.TextInput;
  const customProps = maskProps ? {
    refInput: ref => setRef(ref, refInput)
  } : {
    ref: refInput
  };
  return /*#__PURE__*/_react.default.createElement(InputComponent, _extends({
    style: style,
    onChangeText: handleChange,
    hitSlop: {
      top: 10,
      bottom: 10,
      left: 0,
      right: 0
    }
  }, maskProps, props, customProps));
};

var _default = CardInput;
exports.default = _default;
//# sourceMappingURL=CardInput.js.map