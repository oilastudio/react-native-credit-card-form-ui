import React from 'react';
import { TextInputMaskProps } from 'react-native-masked-text';
import { TextInputProps } from 'react-native';
export declare type CardInputProps = {
    name: string;
    onChange: (name: string, text: string) => void | null;
    maskProps: TextInputMaskProps;
    placeholderTextColor: string;
    refInput: React.MutableRefObject<any>;
} & TextInputProps;
declare const CardInput: any;
export default CardInput;
