import {
  Box,
  Button,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography
} from '@material-ui/core'
import React, { FC } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteUser } from '../../redux/actions/userAction'
import { RootState } from '../../redux/reducer/root'
import {} from '../../services/auth'

const useStyles = makeStyles((theme: Theme) => ({
  darkBackground: {
    backgroundColor: 'rgba(0, 0, 100, 0.3)'
  },
  root: {
    padding: theme.spacing(2)
  }
}))

export type AccountMenuPropsType = {}

const AccountMenu: FC<AccountMenuPropsType> = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const user = useSelector((state: RootState) => state?.user?.user)
  const dispatch = useDispatch()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Button onClick={handleClick}>Account</Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.darkBackground}
      >
        <Box className={classes.root}>
          <Grid container direction='column'>
            <Typography variant='h5'>
              Logged in as {user?.username}
            </Typography>
          </Grid>
        </Box>
        <MenuItem onClick={() => dispatch(deleteUser())}>Log out</MenuItem>
      </Menu>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteUser: bindActionCreators(deleteUser, dispatch)
  }
}

export default connect(
  (state: RootState) => state,
  mapDispatchToProps
)(AccountMenu)
