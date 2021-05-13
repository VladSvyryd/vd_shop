import palette from '../palette';

export default {
  root: { lineHeight: 'inherit' },
  input: {
    '&::placeholder': {
      opacity: 1,
      color: palette.text.secondary,
    },
  },
};
