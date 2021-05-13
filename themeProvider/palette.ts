import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#191919';
const grey = '#9F9F9F';
const lightBlack = '#4d4d4d';
const lightWhite = '#fafafa';
export const greyPaper = '#eeeeee';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: black,
    main: black,
    light: lightBlack,
  },
  secondary: {
    contrastText: black,
    dark: white,
    main: white,
    light: lightWhite,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.teal[900],
    main: '#03DAC6',
    light: colors.teal[100],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: black,
    secondary: grey,
    link: colors.blue[600],
  },
  background: {
    default: white,
    paper: white,
  },
  icon: black,
  divider: colors.grey[200],
};
