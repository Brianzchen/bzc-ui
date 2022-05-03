// @flow
import * as React from 'react';

import { isIE } from '../internal/isIE';
import removePx from '../internal/removePx';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

import ScrollButton from './ScrollButton';
import Tab from './Tab';

type TabProportionsT = {|
  sum: number,
  proportion: Array<number>,
|};

export type TabsT = {
  ...BoxT,
  /** list of objects that will come together to build tabs to form a list of tabs */
  tabs?: Array<{
    value?: string | number,
    children?: React.Node,
    label?: React.Node,
    style?: StyleT,
    'data-testid'?: string,
    ...
  }>,
  /** overrides styling for element wrapping the tabs */
  tabContainerStyle?: StyleT,
  /** sets the height of the tabs for design feature requirements */
  variant?: 'md' | 'lg',
  /**
   * spreads the tabs spaced evenly across the container
   */
  fullWidth?: boolean,
  ...
};

/**
 * Used to display multiple content areas, which can be viewed by selecting the respective tab.
 */
const Tabs: React$AbstractComponent<TabsT, HTMLElement> = React.forwardRef(({
  tabs = [],
  style = {},
  tabContainerStyle = {},
  variant = 'md',
  color = 'secondary',
  fullWidth = false,
  ...otherProps
}: TabsT, ref) => {
  // fullWidth does not work in IE
  // Can fix in the future and UX are aware of this limitation
  // when used in their designs
  const applyFullWidth = fullWidth && !isIE;
  const tabSpacing = applyFullWidth ? 2 : 4;

  const internalRef = React.useRef<HTMLElement | null>(null);
  const activeRef = ref || internalRef;
  const tabContainerRef = React.useRef();

  const theme = useTheme();
  const compTestId = useComponentTestId('Tabs');

  const [containerWidth, setContainerWidth] = React.useState(0);
  const [tabProportions, setTabProportions] = React.useState<TabProportionsT>({
    sum: 0,
    proportion: [],
  });
  const [showNav, setShowNav] = React.useState(false);
  const [disableLeft, setDisableLeft] = React.useState(false);
  const [disableRight, setDisableRight] = React.useState(false);

  // pull the proportions of each child element and generate a sum.
  // Widths are contents of each tab excluding padding which is prone
  // to changes from Tab with fullWidth enabled
  React.useEffect(() => {
    const resize = () => {
      const { current } = tabContainerRef;
      if (current && applyFullWidth) {
        const childWidths = Array.from(current.childNodes).map((o) => {
          const element = window.getComputedStyle(o.childNodes[0]);
          const { paddingLeft, paddingRight, width } = element;
          return (removePx(width) - removePx(paddingLeft) - removePx(paddingRight));
        });
        const sum = childWidths.reduce((a, b) => a + b, 0);
        if (sum !== tabProportions.sum) {
          setTabProportions({
            sum,
            proportion: childWidths,
          });
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [tabs]);

  // set the tab container width for the nav buttons to track
  React.useEffect(() => {
    const resize = () => {
      if (activeRef.current instanceof HTMLElement) {
        setContainerWidth(activeRef.current.getBoundingClientRect().width);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  // track if nav buttons should show
  React.useEffect(() => {
    const { current } = tabContainerRef;

    if (!current) return;

    const childrenWidth = Array.from(current.childNodes).reduce(
      (acc, cur) => acc + cur.getBoundingClientRect().width,
      0,
    );

    if (containerWidth !== 0
        && containerWidth < childrenWidth) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  });

  // disable buttons if scrolled all the way either side
  React.useEffect(() => {
    const { current } = tabContainerRef;

    if (!current) return undefined;

    const onScroll = () => {
      const scrollRight = (elm) => (
        elm.scrollWidth - (elm.scrollLeft + elm.clientWidth)
      );

      if (current.scrollLeft <= 0) {
        setDisableLeft(true);
      } else if (scrollRight(current) <= 0) {
        setDisableRight(true);
      } else {
        disableLeft && setDisableLeft(false);
        disableRight && setDisableRight(false);
      }
    };

    onScroll();
    current.addEventListener('scroll', onScroll);

    return () => {
      current.removeEventListener('scroll', onScroll);
    };
  });

  const styles = {
    container: styler(style, theme, {
      display: 'flex',
      backgroundColor: theme.colors.monoInverse(),
      width: '100%',
      padding: 0,
      margin: 0,
    }),
    tabContainer: styler(tabContainerStyle, theme, {
      flex: 1,
      whiteSpace: 'nowrap',
      overflowX: 'auto',
      MsOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        display: 'none',
      },
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={activeRef}
      style={styles.container}
    >
      {
        showNav
        && (
          <ScrollButton
            data-testid={compTestId('left-scroll-button')}
            tabContainerRef={tabContainerRef}
            scrollDirection="left"
            disabled={disableLeft}
          />
        )
      }
      <Box
        ref={tabContainerRef}
        data-testid={compTestId('tab-container')}
        style={styles.tabContainer}
      >
        {
          tabs.map(({
            value,
            children,
            label,
            ...others
          }) => (
            <Tab
              {...others}
              key={value}
              data-testid={others['data-testid'] || compTestId('tab')}
              value={value}
              variant={variant}
              proportion={applyFullWidth && containerWidth && tabProportions.sum
                ? (containerWidth
                  - 1
                  - tabProportions.sum
                  - (theme.spacing(tabSpacing) * 2 * tabs.length))
                  / tabs.length
                : undefined}
              color={color}
              navShowing={showNav}
              tabSpacing={tabSpacing}
            >
              {children || label || value}
            </Tab>
          ))
        }
      </Box>
      {
        showNav
        && (
          <ScrollButton
            data-testid={compTestId('right-scroll-button')}
            tabContainerRef={tabContainerRef}
            scrollDirection="right"
            disabled={disableRight}
          />
        )
      }
    </Box>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
