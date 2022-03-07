// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import ToggleButton from '../ToggleButton';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';
import useComponentTestId from '../internal/hooks/useComponentTestId';

type Props = {
  ...BoxT,
  /**
   * the modes will change what is returned by `onSelect`
   * as well rendering slightly differently
   */
  variant?: 'single' | 'multiple',
  /**
   * will be called when one of the ToggleButton's are clicked
   * and will return (event, { newSelection }) => {}.
   * Where `newSelection` is an array of indexes that can be stored
   * and passed back into GroupedToggleButtons' `selection` prop
  */
  onSelect?: (...args: Array<any>) => any,
  /** takes an array of indexes to define which buttons are selected */
  selection?: Array<number>,
  /**
   * array of objects where each object defines the props passed into
   * each ToggleButton
   */
  buttons?: Array<{
    children?: React.Node,
    onClick?: (...args: Array<any>) => any,
    style?: StyleT,
    'data-testid'?: string,
    ...
  }>,
  /** overrides styling for root element */
  style?: StyleT,
  ...
};

const GroupedToggleButtons: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  variant = 'single',
  onSelect,
  selection = [],
  buttons = [],
  style = {},
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId('GroupedToggleButton');

  const onButtonClick = (event, index, selected) => {
    let newSelection;

    if (variant === 'single') {
      newSelection = selected ? [] : [index];
    } else if (selected) {
      newSelection = selection.filter((o) => o !== index);
    } else {
      newSelection = [...selection, index];
    }

    onSelect && onSelect(event, {
      newSelection,
    });
  };

  const styles = {
    container: styler(style, theme, {
      display: 'flex',
    }),
    single: (index, selected) => {
      const removeLeftRoundness = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: -1,
      };
      const removeRightRoundness = {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      };

      const indexStyle = () => {
        if (index === 0) {
          return removeRightRoundness;
        }
        if (index === buttons.length - 1) {
          return removeLeftRoundness;
        }
        return { ...removeLeftRoundness, ...removeRightRoundness };
      };

      return {
        position: 'relative',
        zIndex: selected ? 1 : 0,
        ...indexStyle(),
      };
    },
    multiple: (index) => ({
      ...index !== 0
        ? {
          marginLeft: theme.spacing(2),
        }
        : {},
    }),
  };

  const getBaseStyle = (buttonType, index, selected) => {
    if (buttonType === 'multiple') {
      return styles.multiple(index);
    }
    return styles.single(index, selected);
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      {buttons.map(({
        children = null,
        onClick,
        style: toggleStyle = {},
        ...otherButtonProps
      }, i) => {
        const selected = selection.indexOf(i) > -1;

        const dataTestid = otherButtonProps['data-testid'] || compTestId(i);

        return (
          <ToggleButton
            {...otherButtonProps}
            key={i} // eslint-disable-line react/no-array-index-key
            data-testid={dataTestid}
            style={styler(toggleStyle, theme, getBaseStyle(variant, i, selected))}
            onClick={(event) => {
              onButtonClick(event, i, selected);
              onClick && onClick();
            }}
            selected={selected}
          >
            {children}
          </ToggleButton>
        );
      })}
    </Box>
  );
});

GroupedToggleButtons.displayName = 'GroupedToggleButtons';

export default GroupedToggleButtons;
