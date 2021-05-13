import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import overrides from './overrides';
import typography from './typography';
// import overrides from './overrides'

export const theme = createMuiTheme({
  palette,
  typography,
  // overrides,
  zIndex: {
    // appBar: 1200,
    // drawer: 1100
  },
  breakpoints: {
    values: {
      xs: 288,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1460,
    },
  },
  overrides,
});
