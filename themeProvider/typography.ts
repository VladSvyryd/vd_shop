import palette from './palette';
import { grey } from '@material-ui/core/colors';

export default {
  fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
  fontSize: 16,
  h1: {
    color: palette.text.primary,
    fontWeight: 700,
    fontSize: '40px',
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 700,
    fontSize: '25px',
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: 'initial',
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 700,
    fontSize: '14px',
  },
  h5: {
    color: grey[600],
    fontWeight: 700,
    fontSize: '12px',
  },
  body1: {
    color: palette.text.primary,
    fontSize: '16px',
    lineHeight: 'initial',
  },
  body2: {
    color: palette.text.primary,
    fontSize: '20px',
    lineHeight: 'initial',
  },
  subtitle1: {
    fontWeight: 700,
    fontSize: '16px',
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: '12px',
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px',
    fontFamily: 'Roboto',
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
  },
};
// <>
// <Typography variant='h1'>PageTitle - h1</Typography>

// <Typography variant='h2'>Question - h2</Typography>

// <Typography variant='h3'>Description h3</Typography>

// <Typography variant='subtitle2'>SubTitle - subtitle1</Typography>

// <Typography variant='body1'>Body - body1</Typography>

// <Typography variant='body2'>Description - body2</Typography>
// </>
