/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
import * as React from 'react';
import * as yup from 'yup';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  PixelRatio,
  Platform,
} from 'react-native';
// import CreditCardType from 'credit-card-type';
import cardValidator from 'card-validator';
import * as Animatable from 'react-native-animatable';
import CardSide, { CardSideEnum } from './CardSide';
import CardInput from './CardInput';
const validationSchema = yup.object().shape({
  holder: yup
    .string()
    .defined()
    .test('is-valid-holder', 'Holder name is invalid', function (holderName) {
      const { runtime = false } = this.options.context;
      const { isPotentiallyValid, isValid } = cardValidator.cardholderName(
        holderName
      );
      return runtime ? isPotentiallyValid : isValid;
    }),
  number: yup
    .string()
    .defined()
    .test('is-valid-card-number', 'Card number is invalid', function (
      cardNumber
    ) {
      const { runtime = false } = this.options.context;
      const { isPotentiallyValid, isValid } = cardValidator.number(cardNumber);
      return runtime ? isPotentiallyValid : isValid;
    }),
  expiration: yup
    .string()
    .defined()
    .test('is-valid-expiration', 'Card expiration is invalid', function (
      expiration
    ) {
      const { runtime = false } = this.options.context;
      const { isPotentiallyValid, isValid } = cardValidator.expirationDate(
        expiration
      );
      return runtime ? isPotentiallyValid : isValid;
    }),
  cvv: yup
    .string()
    .defined()
    .test('is-valid-cvv', 'Card CVV is invalid', function (cvv) {
      const { runtime = false } = this.options.context;
      const { isPotentiallyValid, isValid } = cardValidator.cvv(cvv);
      return runtime ? isPotentiallyValid : isValid;
    }),
});
const Images = {
  chip: require('./images/chip.png'),
  brands: {
    default: '',
    visa: require('./images/brands/visa.png'),
  },
  icons: {
    rotate: require('./images/icons/rotate.png'),
  },
};
const defaultCardConfig = {
  numberMask: '9999 9999 9999 9999',
  cvvMask: '999',
  brandImage: Images.brands.default,
  brandName: '',
};
const CreditCard = React.forwardRef(
  (
    {
      placeholders,
      labels,
      background,
      textColor,
      errorTextColor,
      placeholderTextColor,
      initialValues,
      expirationDateFormat,
      onValidStateChange,
    },
    ref
  ) => {
    /** States */
    const [cardData, setCardData] = React.useState(initialValues);
    const [activeSide, setActiveSide] = React.useState(CardSideEnum.FRONT);
    const [cardConfig, setCardConfig] = React.useState(defaultCardConfig);
    const [errors, setErrors] = React.useState({
      number: false,
      holder: false,
      expiration: false,
      cvv: false,
    });
    /** Animations Refs */
    const frontOpacityRef = React.useRef(new Animated.Value(1)).current;
    const backOpacityRef = React.useRef(new Animated.Value(0)).current;
    const rotationValue = React.useRef(new Animated.Value(0)).current;
    /** Input Refs */
    const numberInputRef = React.useRef(null);
    const holderInputRef = React.useRef(null);
    const expirationInputRef = React.useRef(null);
    const cvvInputRef = React.useRef(null);
    /** Other refs */
    const cardDataIsValid = React.useRef(false);
    /** Runtime Styles */
    const textStyle = { color: textColor };
    /** Animate Card (Rotate) */
    const rotate = React.useCallback(() => {
      const fadeAnimationConfig = (appearing) => ({
        toValue: appearing ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      });
      const rotateAnimationConfig = (isAppearing) => ({
        toValue: isAppearing ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      });
      const isFrontActive = activeSide === CardSideEnum.FRONT;
      Animated.parallel([
        Animated.timing(frontOpacityRef, fadeAnimationConfig(!isFrontActive)),
        Animated.timing(backOpacityRef, fadeAnimationConfig(isFrontActive)),
        Animated.timing(rotationValue, rotateAnimationConfig(isFrontActive)),
      ]).start(() => {
        const newActiveSide = isFrontActive
          ? CardSideEnum.BACK
          : CardSideEnum.FRONT;
        setActiveSide(newActiveSide);
      });
    }, [activeSide, backOpacityRef, frontOpacityRef, rotationValue]);
    const expirationMask =
      expirationDateFormat === 'MM/YY' ? '99/99' : '99/9999';
    const validateField = React.useCallback((name, value) => {
      const values = { [name]: value };
      const response = {
        isPontentiallyValid: false,
        isValid: false,
        error: null,
      };
      try {
        // Check potentially invalid... If has error, it is throwed...
        validationSchema.validateSyncAt(name, values, {
          context: { runtime: true },
        });
        response.isPontentiallyValid = true;
        // Check if is valid... If has error, it is throwed...
        validationSchema.validateSyncAt(name, values, {
          context: { runtime: false },
        });
        response.isValid = true;
      } catch (validationError) {
        setErrors((prev) => ({
          ...prev,
          [name]: response.isPontentiallyValid ? false : validationError,
        }));
      }
      return response;
    }, []);
    const loadCardConfig = (cardNumber) => {
      const { card = null } = cardValidator.number(cardNumber);
      if (!card) {
        setCardConfig({ ...defaultCardConfig });
        return;
      }
      const {
        type = '',
        code = { size: 0 },
        gaps = [],
        lengths = [],
        niceType = '',
      } = card;
      setCardData((prev) => ({
        ...prev,
        brand: type,
      }));
      setCardConfig((prev) => {
        const maxLength = Math.max(...lengths);
        const maskChars = ''.padStart(maxLength, '9').split('');
        for (let i = 0; i < gaps.length; i += 1) {
          maskChars.splice(gaps[i] + i, 0, ' ');
        }
        const numberMask = maskChars.join('');
        const cvvMask = ''.padStart(code.size, '9');
        const brandImage = Images.brands[type]
          ? Images.brands[type]
          : Images.brands.default;
        return {
          ...prev,
          numberMask,
          cvvMask,
          brandImage,
          brandName: niceType,
        };
      });
    };
    const handleInputChange = React.useCallback(
      (name, text) => {
        setCardData((prev) => ({ ...prev, [name]: text }));
        const { isValid } = validateField(name, text);
        if (name === 'number') {
          loadCardConfig(text);
          if (isValid) {
            focusField(holderInputRef);
          }
        } else if (
          name === 'expiration' &&
          isValid &&
          text.length === expirationMask.length
        ) {
          focusField(cvvInputRef);
          rotate();
        }
      },
      [validateField, rotate, expirationMask]
    );
    const getSideStyle = React.useCallback(
      (side) => {
        const outputRange = side === CardSideEnum.FRONT ? [1, -1] : [-1, 1];
        return {
          transform: [
            {
              scaleX: rotationValue.interpolate({
                inputRange: [0, 1],
                outputRange,
              }),
            },
          ],
          opacity:
            side === CardSideEnum.FRONT ? frontOpacityRef : backOpacityRef,
          zIndex: side === activeSide ? 1 : 0,
        };
      },
      [activeSide, backOpacityRef, frontOpacityRef, rotationValue]
    );
    const focusField = (field) => {
      if (!field || !field.current) return;
      field.current.focus();
    };
    const submit = React.useCallback(() => {
      const response = {
        error: null,
        data: cardData,
      };
      try {
        validationSchema.validateSync(cardData, {
          context: { runtime: false },
          abortEarly: false,
        });
      } catch (err) {
        response.error = err;
      }
      return response;
    }, [cardData]);
    React.useEffect(() => {
      if (cardDataIsValid.current !== undefined) {
        try {
          validationSchema.validateSync(cardData, {
            context: { runtime: false },
          });
          onValidStateChange(true);
        } catch (validationErrors) {
          onValidStateChange(false, validationErrors);
        }
      }
    }, [cardData, onValidStateChange]);
    React.useImperativeHandle(ref, () => ({ submit }));
    return React.createElement(
      TouchableWithoutFeedback,
      { onPress: Keyboard.dismiss },
      React.createElement(
        View,
        { style: styles.cardWrapper },
        React.createElement(
          CardSide,
          {
            background: background,
            style: [[getSideStyle(CardSideEnum.FRONT)]],
          },
          React.createElement(
            View,
            { style: styles.header },
            React.createElement(
              TouchableOpacity,
              { onPress: rotate },
              React.createElement(Image, { source: Images.icons.rotate })
            ),
            !!cardConfig.brandImage &&
              React.createElement(Animatable.Image, {
                source: cardConfig.brandImage,
                animation: 'slideInRight',
                duration: 400,
                useNativeDriver: true,
              }),
            !!(!cardConfig.brandImage && cardConfig.brandName) &&
              React.createElement(
                Animatable.Text,
                {
                  style: [styles.textData, textStyle],
                  animation: 'slideInRight',
                  duration: 400,
                },
                cardConfig.brandName
              )
          ),
          React.createElement(Image, {
            source: Images.chip,
            style: styles.imageChip,
          }),
          React.createElement(
            View,
            null,
            React.createElement(CardInput, {
              placeholderTextColor: placeholderTextColor,
              name: 'number',
              onChange: handleInputChange,
              value: cardData?.number,
              autoFocus: true,
              placeholder: placeholders.number,
              style: [
                styles.textCardNumber,
                { color: errors.number ? errorTextColor : textColor },
              ],
              maxLength: cardConfig.numberMask.length,
              autocompleteType: 'cc-number',
              textContentType: 'creditCardNumber',
              maskProps: {
                type: 'custom',
                options: { mask: cardConfig.numberMask },
              },
              refInput: numberInputRef,
              returnKeyType: 'next',
              autoCorrect: false,
              onSubmitEditing: () => focusField(holderInputRef),
              blurOnSubmit: false,
            })
          ),
          React.createElement(
            View,
            { style: styles.footer },
            React.createElement(
              View,
              { style: styles.holderWrapper },
              React.createElement(
                Text,
                { style: [styles.textLabel, textStyle] },
                labels.holder
              ),
              React.createElement(CardInput, {
                placeholderTextColor: placeholderTextColor,
                name: 'holder',
                autocompleteType: 'name',
                textContentType: 'name',
                returnKeyType: 'next',
                onChange: handleInputChange,
                placeholder: placeholders.holder,
                autoCapitalize: 'characters',
                style: [
                  styles.textData,
                  { color: errors.holder ? errorTextColor : textColor },
                ],
                value: cardData?.holder,
                refInput: holderInputRef,
                onSubmitEditing: () => focusField(expirationInputRef),
                blurOnSubmit: false,
              })
            ),
            React.createElement(
              View,
              { style: styles.expirationWrapper },
              React.createElement(
                Text,
                { style: [styles.textLabel, textStyle] },
                labels.expiration
              ),
              React.createElement(CardInput, {
                placeholderTextColor: placeholderTextColor,
                name: 'expiration',
                autocompleteType: 'cc-exp',
                keyboardType: 'numbers-and-punctuation',
                returnKeyType: 'next',
                onChange: handleInputChange,
                placeholder: placeholders.expiration,
                style: [
                  styles.textData,
                  {
                    color:
                      errors.expiration &&
                      cardData.expiration.length === expirationMask.length
                        ? errorTextColor
                        : textColor,
                  },
                ],
                value: cardData?.expiration,
                maxLength: 7,
                maskProps: {
                  type: 'custom',
                  options: { mask: expirationMask },
                },
                refInput: expirationInputRef,
                onSubmitEditing: () => {
                  focusField(cvvInputRef);
                  rotate();
                },
                blurOnSubmit: false,
              })
            )
          )
        ),
        React.createElement(
          CardSide,
          { style: [getSideStyle(CardSideEnum.BACK)], background: background },
          React.createElement(View, { style: styles.strip }),
          React.createElement(
            TouchableOpacity,
            { onPress: rotate },
            React.createElement(Image, { source: Images.icons.rotate })
          ),
          React.createElement(
            View,
            { style: styles.cvvWrapper, pointerEvents: 'box-none' },
            React.createElement(
              Text,
              { style: [styles.textLabel, textStyle] },
              labels.cvv
            ),
            React.createElement(CardInput, {
              placeholderTextColor: placeholderTextColor,
              name: 'cvv',
              autocompleteType: 'cc-csc',
              keyboardType: 'numeric',
              returnKeyType: 'done',
              onChange: handleInputChange,
              placeholder: placeholders.cvv,
              style: [
                styles.textData,
                { color: errors.cvv ? errorTextColor : textColor },
              ],
              value: cardData?.cvv,
              maxLength: cardConfig.cvvMask.length,
              maskProps: {
                type: 'custom',
                options: { mask: cardConfig.cvvMask },
              },
              onBlur: rotate,
              refInput: cvvInputRef,
            })
          )
        )
      )
    );
  }
);
CreditCard.defaultProps = {
  placeholders: {
    number: '0000 0000 0000 0000',
    holder: 'TITULAR DO CARTÃO',
    expiration: 'MM/YYYY',
    cvv: '000',
  },
  labels: {
    holder: 'TITULAR DO CARTÃO',
    expiration: 'VENCIMENTO',
    cvv: 'CÓD. SEGURANÇA',
  },
  expirationDateFormat: 'MM/YYYY',
  textColor: '#FFFFFF',
  placeholderTextColor: '#9B84A9',
  initialValues: {
    number: '',
    holder: '',
    expiration: '',
    cvv: '',
    brand: '',
  },
  errorTextColor: '#F15A5B',
  onValidStateChange: () => {},
};
const styles = StyleSheet.create({
  cardWrapper: {
    height: '100%',
    maxHeight: 220,
    position: 'relative',
    width: '100%',
    maxWidth: 350,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textLabel: {
    fontSize: 10 / PixelRatio.getFontScale(),
    textTransform: 'uppercase',
  },
  textData: {
    fontWeight: 'bold',
    fontSize: 16 / PixelRatio.getFontScale(),
    marginTop: Platform.OS == 'android' ? -10 : undefined,
    marginLeft: Platform.OS == 'android' ? -4 : undefined,
  },
  textCardNumber: {
    fontSize: 20 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: Platform.OS == 'ios' ? 16 : 5,
    letterSpacing: 2,
  },
  imageChip: {
    marginTop: 16,
  },
  footer: {
    marginTop: Platform.OS == 'ios' ? 16 : 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strip: {
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 48,
    height: 40,
  },
  cvvWrapper: {
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 24,
  },
  holderWrapper: {
    flex: 2,
    marginRight: 16,
  },
  expirationWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default CreditCard;
