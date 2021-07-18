import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
    customScrollbar: {
      '& *::-webkit-scrollbar': {
        width: '0.4em',
      },
      '& *::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '& *::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: '16px',
      },
    },
    slide: {
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    sliderContainer: {},
    dotListClass: {
      display: 'flex',
      position: 'relative',
      flexWrap: 'wrap',
      width: '60%',
      margin: 'auto',
      '&>div:not(:last-child)': {
        // margin: '10px 10px 10px 0',
      },
      '&>div': {
        margin: '10px 5px 0',
      },
    },
    dotCard: {
      opacity: 0.3,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    dotCardActive: {
      opacity: 1,
    },
  }),
)