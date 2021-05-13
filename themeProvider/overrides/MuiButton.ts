import { colors } from '@material-ui/core';

export default {
  root: {
    fontFamily: 'Poppins',
  },
  containedPrimary: {
    borderRadius: '24px',
    '&:hover': {
      // changes colors for hover state
      // backgroundColor: theme.palette.secondary.main,
      // color: theme.palette.primary.dark,
    },
  },

  containedSecondary: {
    borderRadius: '24px',
  },
};
