// @flow
import React, { useState, useEffect, useRef } from 'react';

import hexToRgba from '../internal/hexToRgba';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import BaseButton, { type BaseButtonT } from '../BaseButton';
import Box from '../Box';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import Typography from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';
import type { ColorsT, StyleT } from '../types';

type VariantStylesT = {|
  primary: any,
  secondary: any,
  tertiary: any,
  destructive: any,
  'destructive-tertiary': any,
|};

export type ButtonT = {
  ...BaseButtonT,
  /** overrides styling for focus highlight element */
  focusEffectStyle?: StyleT,
  /** overrides styling for text element */
  textStyle?: StyleT,
  /** the look and feel of the button */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'destructive-tertiary',
  /**
   * When rendering a `tertiary` or `destructive-tertiary` variant
   * and on an inverse background this can be used to flip the text color
   * to more visible
   */
  tertiaryAlternateText?: boolean,
  /**
   * To indicate that the button action is submitting.
   * The button will be disabled
   */
  loading?: boolean,
  /**
   * Icon to render along side the left of the text within the button
   */
  prefixIcon?: string,
  /**
   * Icon to render along side the right of the text within the button
   */
  suffixIcon?: string,
  /** overrides styling for prefix icon element */
  prefixIconStyle?: StyleT,
  /** overrides styling for suffix icon element */
  suffixIconStyle?: StyleT,
  ...
};

/**
 * Button's perform an action when clicked.
 * The button text should clearly be an actionable word.
 */
const Button: React$AbstractComponent<ButtonT, HTMLElement> = React.forwardRef<ButtonT, HTMLElement>(({
  children = null,
  style = {},
  focusEffectStyle = {},
  textStyle = {},
  variant = 'primary',
  tertiaryAlternateText = false,
  disabled = false,
  loading = false,
  prefixIcon,
  suffixIcon,
  prefixIconStyle = {},
  suffixIconStyle = {},
  ...otherProps
}: ButtonT, ref) => {
  const internalRef = useRef();
  const activeRef = ref || internalRef;
  const theme = useTheme();
  const compTestId = useComponentTestId('Button');

  const [focused, setFocus] = useState(false);

  const buttonDisabled: boolean = disabled || loading;

  useEffect(() => {
    if (buttonDisabled) {
      setFocus(false);
    }
  }, [buttonDisabled]);

  const getColor = (color) => (
    hexToRgba(color, buttonDisabled ? 0.5 : 1)
  );

  const borderWidth = theme.line(1);
  const buttonType: VariantStylesT = {
    primary: {
      backgroundColor: getColor(theme.colors.secondary()),
      border: `${borderWidth} solid transparent`,
      ':active': {
        backgroundColor: theme.colors.secondary(0.5),
        borderColor: theme.colors.secondary(0.5),
      },
    },
    secondary: {
      backgroundColor: theme.colors.monoInverse(),
      border: `${borderWidth} solid ${getColor(theme.colors.monoMid())}`,
      ':active': {
        backgroundColor: theme.colors.monoLow(),
      },
    },
    tertiary: {
      backgroundColor: 'transparent',
      border: `${borderWidth} solid transparent`,
      borderRadius: theme.corner(0),
      ':active': {
        backgroundColor: theme.colors.monoLow(),
      },
    },
    destructive: {
      backgroundColor: theme.colors.monoInverse(),
      border: `${borderWidth} solid ${getColor(theme.colors.monoMid())}`,
      ':active': {
        backgroundColor: theme.colors.monoLow(),
      },
    },
    'destructive-tertiary': {
      backgroundColor: 'transparent',
      border: `${borderWidth} solid transparent`,
      borderRadius: theme.corner(0),
      ':active': {
        backgroundColor: theme.colors.monoLow(),
      },
    },
  };

  const buttonTextType: { [key: string]: string } = {
    primary: theme.colors.monoInverse(),
    secondary: getColor(theme.colors.monoPrimary()),
    tertiary: getColor(tertiaryAlternateText
      ? theme.colors.monoInverse()
      : theme.colors.secondary()),
    destructive: getColor(theme.colors.error()),
    'destructive-tertiary': getColor(theme.colors.error()),
  };

  const spinnerColor: { [key: string]: $Keys<ColorsT> } = {
    primary: 'monoInverse',
    secondary: 'monoPrimary',
    tertiary: 'secondary',
    destructive: 'error',
    'destructive-tertiary': 'error',
  };

  const focusedEffect = focused ? `calc(50% - ${theme.spacing(9) / 2}px)` : '50%';
  const hasIcon = !!(prefixIcon || suffixIcon);

  const styles = {
    button: styler(style, theme, {
      position: 'relative',
      display: 'block',
      width: '100%',
      padding: `${theme.spacing(2) + (hasIcon ? theme.spacing(1) / 4 : theme.spacing(1))}px ${theme.spacing(4)}px`,
      minHeight: theme.spacing(7),
      textAlign: 'center',
      borderRadius: theme.corner(2),
      overflow: 'hidden',
      ...buttonDisabled
        ? {
          ...buttonType[variant],
          ':active': {
            backgroundColor: buttonType[variant].backgroundColor,
          },
        }
        : buttonType[variant],
    }),
    prefixIcon: styler(prefixIconStyle, theme, {
      color: buttonTextType[variant],
      margin: `0 ${theme.spacing(2)}px 0 0`,
    }),
    suffixIcon: styler(suffixIconStyle, theme, {
      color: buttonTextType[variant],
      margin: `0 0 0 ${theme.spacing(2)}px`,
    }),
    focusEffect: styler(focusEffectStyle, theme, {
      position: 'absolute',
      left: focusedEffect,
      top: focusedEffect,
      right: focusedEffect,
      bottom: focusedEffect,
      transition: 'left 0.2s linear, top 0.2s linear, right 0.2s linear, bottom 0.2s linear',
      backgroundColor: variant === 'primary'
        ? theme.colors.secondary(0.2)
        : theme.colors.monoLow(),
      borderRadius: '100%',
    }),
    text: styler(textStyle, theme, {
      position: 'relative',
      zIndex: 1,
      bottom: hasIcon ? theme.spacing(1) / 2 : undefined,
      color: buttonTextType[variant],
      ...buttonDisabled
        ? {
          pointerEvents: 'none',
        }
        : { ...null },
    }),
    spinner: {
      margin: 'auto',
      height: theme.fonts.button.leading,
      ...buttonDisabled
        ? {
          pointerEvents: 'none',
        }
        : { ...null },
    },
  };

  return (
    <BaseButton
      {...otherProps}
      ref={activeRef}
      disabled={buttonDisabled}
      style={styles.button}
      setFocus={(f) => setFocus(f)}
    >
      {loading
        ? (
          <LoadingSpinner
            data-testid={compTestId('loading-spinner')}
            color={spinnerColor[variant]}
            size={`${theme.fonts.button.px}px`}
            style={styles.spinner}
          />
        )
        : (
          <>
            {prefixIcon && (
              <Icon
                data-testid={compTestId('prefix-icon')}
                icon={prefixIcon}
                size={theme.fonts.heading1.px}
                style={styles.prefixIcon}
              />
            )}
            <Typography
              data-testid={compTestId('child')}
              inline
              type="button"
              style={styles.text}
            >
              {children}
            </Typography>
            {suffixIcon && (
              <Icon
                data-testid={compTestId('suffix-icon')}
                icon={suffixIcon}
                size={theme.fonts.heading1.px}
                style={styles.suffixIcon}
              />
            )}
          </>
        )}
      {theme.focusEffect && (
        <Box data-testid={compTestId('focus-effect')} style={styles.focusEffect} />
      )}
    </BaseButton>
  );
});

Button.displayName = 'Button';

export default Button;
