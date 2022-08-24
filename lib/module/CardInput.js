function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native';

const CardInput = ({
  name,
  maskProps,
  refInput,
  onChange = () => {},
  style,
  ...props
}) => {
  const handleChange = React.useCallback(text => {
    const value = text.toUpperCase();
    return onChange(name, value);
  }, [name, onChange]);

  const setRef = (inputRef, ref) => {
    if (typeof ref === 'object') {
      ref.current = inputRef;
    }
  };

  const InputComponent = maskProps ? TextInputMask : TextInput;
  const customProps = maskProps ? {
    refInput: ref => setRef(ref, refInput)
  } : {
    ref: refInput
  };
  return /*#__PURE__*/React.createElement(InputComponent, _extends({
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

export default CardInput;
//# sourceMappingURL=CardInput.js.map