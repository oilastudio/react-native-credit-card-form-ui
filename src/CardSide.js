import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
export const CardSideEnum = {
    FRONT: 'FRONT',
    BACK: 'BACK',
};
const CardSide = ({ children, style = [], background = '#612F74', ...props }) => {
    const SideBackground = React.useCallback(({ children: child }) => {
        return typeof background === 'string' ? (React.createElement(View, { style: { borderRadius: 9, backgroundColor: background } }, child)) : (React.cloneElement(background, { children: child }));
    }, [background]);
    return (React.createElement(Animated.View, Object.assign({ style: [styles.sideWrapper, ...style] }, props),
        React.createElement(SideBackground, null,
            React.createElement(View, { style: styles.container }, children))));
};
const styles = StyleSheet.create({
    sideWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        borderRadius: 9,
    },
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 16,
    },
});
export default CardSide;
