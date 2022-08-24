import * as React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Platform, } from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';
export default function App() {
    const creditCardRef = React.useRef();
    const handleSubmit = React.useCallback(() => {
        if (creditCardRef.current) {
            const { error, data } = creditCardRef.current.submit();
            console.log('ERROR: ', error);
            console.log('CARD DATA: ', data);
        }
    }, []);
    return (React.createElement(KeyboardAvoidingView, { behavior: Platform.OS === 'ios' ? 'padding' : 'height', keyboardVerticalOffset: 20, style: styles.container },
        React.createElement(CreditCard, { ref: creditCardRef, onValidStateChange: console.log }),
        React.createElement(Button, { title: "Submit", onPress: handleSubmit })));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
