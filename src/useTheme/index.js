// @flow
import { useContext } from 'react';

import ThemeContext from '../theme/themeContext';
import type { ThemeT } from '../types';

/**
 * A React hook that returns the theme object into your component.
 */
export default (): ThemeT => useContext(ThemeContext);
