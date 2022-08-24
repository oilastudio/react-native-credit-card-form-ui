import * as React from 'react';
import * as yup from 'yup';
export declare type CreditCardType = {
    submit: () => {
        error: Error | null;
        data: CardData;
    };
};
interface CardData {
    number?: string;
    holder?: string;
    expiration?: string;
    cvv?: string;
    brand?: string;
}
interface CreditCardProps {
    placeholders?: {
        number?: string;
        holder?: string;
        expiration?: string;
        cvv?: string;
    };
    labels?: {
        holder?: string;
        expiration?: string;
        cvv?: string;
    };
    expirationDateFormat?: 'MM/YYYY' | 'MM/YY';
    initialValues?: CardData;
    background?: string | any;
    textColor?: string;
    placeholderTextColor?: string;
    errorTextColor?: string;
    onValidStateChange?: (cardDataIsValid: boolean) => void;
}
export interface SubmitResponse {
    error: yup.ValidationError | null;
    data: CardData;
}
declare const CreditCard: React.ForwardRefExoticComponent<CreditCardProps & React.RefAttributes<CreditCardType>>;
export default CreditCard;
