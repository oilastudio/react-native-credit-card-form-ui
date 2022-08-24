import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native';
const CardInput = ({ name, maskProps, refInput, onChange = () => { }, style, ...props }) => {
    const handleChange = React.useCallback((text) => {
        const value = text.toUpperCase();
        return onChange(name, value);
    }, [name, onChange]);
    const setRef = (inputRef, ref) => {
        if (typeof ref === 'object') {
            ref.current = inputRef;
        }
    };
    const InputComponent = maskProps ? TextInputMask : TextInput;
    const customProps = maskProps
        ? { refInput: (ref) => setRef(ref, refInput) }
        : { ref: refInput };
    return (React.createElement(InputComponent, Object.assign({ style: style, onChangeText: handleChange, hitSlop: { top: 10, bottom: 10, left: 0, right: 0 } }, maskProps, props, customProps)));
};
export default CardInput;
