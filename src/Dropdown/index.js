// @flow
import * as React from 'react';

import Chevron from '../internal/components/Chevron';

import Box from '../Box';
import Sheet from '../Sheet';
import ToggleButton from '../ToggleButton';
import type { ToggleButtonT } from '../ToggleButton';
import styler from '../styler';
import useTheme from '../useTheme';
import type { RefObjT, StyleT } from '../types';
import useComponentTestId from '../internal/hooks/useComponentTestId';

export type DropdownT = {
  ...ToggleButtonT,
  /**
   * render props function that is passed
   * an object containing, { onClose } and should return
   * a component tree
   */
  sheet?: ({|
    onClose: (...args: Array<any>) => any,
    attachRef: RefObjT,
    sheetRef: RefObjT,
  |}) => React.Node,
  /**
   * opening and closing of the dropdown sheet is usually
   * handled automatically, but this prop can be passed as
   * a direct override and make it a fully controlled component
   */
  open?: boolean,
  /** overrides styling for the opened sheet */
  sheetStyle?: StyleT,
  /** overrides styling for toggle button */
  toggleStyle?: StyleT,
  /**
   * elements outside the Dropdown that you don't want closing the sheet when clicked
   */
   exclusions?: Array<HTMLElement | null>,
  ...
};

/**
 * A Dropdown button that when clicked opens a sheet that can render anything.
 *
 * The dropdown sheet has no styling inside which gives each feature the flexibility to tailor the interior as necessary.
 */
const Dropdown: React$AbstractComponent<DropdownT, HTMLElement> = React.forwardRef<DropdownT, HTMLElement>(({
  children = null,
  sheet,
  onClick = () => {},
  open,
  style = {},
  sheetStyle = {},
  toggleStyle = {},
  exclusions,
  ...otherProps
}: DropdownT, ref) => {
  const buttonRef = React.useRef<HTMLElement | null>(null);
  const theme = useTheme();
  const compTestId = useComponentTestId('Dropdown');

  const [internalOpen, setOpen] = React.useState(false);
  const activeOpen = typeof open !== 'undefined' ? open : internalOpen;

  const handleToggle = (e) => {
    onClick(e);
    setOpen((val) => !val);
  };

  const styles = {
    container: styler(style, theme, {
      position: 'relative',
    }),
    toggle: styler(toggleStyle, theme, {
      display: 'flex',
      alignItems: 'center',
      padding: `${theme.spacing(3) / 2}px ${theme.spacing(2)}px`,
    }),
    chevron: {
      height: theme.fonts.smallButton.px,
      width: theme.fonts.smallButton.px,
      marginLeft: theme.spacing(1),
    },
  };

  return (
    <Box
      ref={ref}
      style={styles.container}
    >
      <ToggleButton
        {...otherProps}
        ref={buttonRef}
        selected
        style={styles.toggle}
        onClick={handleToggle}
      >
        {children}
        <Chevron
          style={styles.chevron}
          direction={activeOpen ? 'up' : 'down'}
        />
      </ToggleButton>
      {activeOpen && (
        <Sheet
          data-testid={compTestId('sheet')}
          onClose={() => setOpen(false)}
          attachRef={buttonRef}
          exclusions={exclusions}
          style={sheetStyle}
        >
          {sheet}
        </Sheet>
      )}
    </Box>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
