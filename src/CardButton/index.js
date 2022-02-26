// @flow
import * as React from 'react';

import Chevron from '../internal/components/Chevron';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import Anchor from '../Anchor';
import type { AnchorT } from '../Anchor';
import BaseButton from '../BaseButton';
import type { BaseButtonT } from '../BaseButton';
import Box from '../Box';
import Typography from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT, ThemeT } from '../types';

type CombinedT = AnchorT & BaseButtonT;

type Props = {
  ...CombinedT,
  /** The element to render as the main text */
  children?: React.Node,
  /**
   * The function to call when the button is clicked
   */
  onClick?: (...args: Array<any>) => any,
  /**
   * If you want to use the button as a link you can pass
   * in an href and the button will render as an anchor tag instead
   */
  href?: string,
  /** overrides styling for root element */
  style?: StyleT,
  /** overrides styling for text element which wraps the `children` */
  textStyle?: StyleT,
  /** overrides styling for chevron element */
  chevronStyle?: StyleT,
  /** whether the text should wrap into multi lines when the text gets too long */
  multiline?: boolean,
  ...
};

/**
 * Button to be used in conjunction with the `Card` component for the user to perform an action.
 *
 * Can render as an underlying `a` or `button` tag depending if passed an `href` or `onClick` respectively.
 */
const CardButton: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  href,
  style = {},
  textStyle = {},
  chevronStyle = {},
  multiline = false,
  ...otherProps
}: Props, ref) => {
  const theme: ThemeT = useTheme();
  const compTestId = useComponentTestId('CardButton');

  const [focused, setFocus] = React.useState(false);

  const focusedEffect = focused ? `calc(50% - ${theme.spacing(11) / 2}px)` : '50%';

  const styles = {
    button: styler(style, theme, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      padding: theme.spacing(3),
      borderTop: `${theme.line(1)} solid ${theme.colors.monoHighlight()}`,
      color: theme.colors.secondary(),
      backgroundColor: theme.colors.monoInverse(),
      outline: 'none',
      overflow: 'hidden',
      ':hover': {
        backgroundColor: theme.colors.monoLow(),
      },
    }),
    focusEffect: {
      position: 'absolute',
      left: focusedEffect,
      top: focusedEffect,
      right: focusedEffect,
      bottom: focusedEffect,
      transition: 'left 0.2s linear, top 0.2s linear, right 0.2s linear, bottom 0.2s linear',
      borderRadius: '100%',
      backgroundColor: theme.colors.successBackground(),
    },
    text: styler(textStyle, theme, {
      zIndex: 1,
      ...multiline
        ? { ...null }
        : {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
    }),
    chevron: styler(chevronStyle, theme, {
      flexShrink: 0,
      height: theme.fonts.button.leading,
      width: theme.fonts.button.px,
      marginLeft: theme.spacing(1),
      zIndex: 1,
    }),
  };

  const Element = href ? Anchor : BaseButton;

  return (
    <Element
      {...otherProps}
      href={href}
      ref={ref}
      style={styles.button}
      setFocus={(f) => setFocus(f)}
    >
      {theme.focusEffect && (
        <Box
          data-testid={compTestId('focus-effect')}
          style={styles.focusEffect}
        />
      )}
      <Typography
        data-testid={compTestId('text')}
        style={styles.text}
        type="button"
      >
        {children}
      </Typography>
      <Chevron
        style={styles.chevron}
        direction="right"
        color={theme.colors.secondary()}
      />
    </Element>
  );
});

CardButton.displayName = 'CardButton';

export default CardButton;
