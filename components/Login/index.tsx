import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { signIn, signUp } from '../../services/auth'
import { setCookie } from '../../services/cookie'
import Copyright from '../../components/Copyright'
import { addUser } from '../../redux/actions/userAction'
import { User } from '../../interfaces/userTypes'
import { RootState } from '../../redux/reducer/root'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { CustomInput } from '../../components/CustomInput'
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Menu
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LoadingSpinner from '../../components/Loading/LoadingSpinner'
import MoodIcon from '@material-ui/icons/Mood'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 400,
    outline: 0
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  gbutton: {
    marginTop: theme.spacing(3)
  },
  loginButton: {
    width: 256,
    justifyContent: 'space-between',
    padding: '8px 15px'
  },
  darkBackground: {
    backgroundColor: 'rgba(0, 0, 100, 0.3)'
  }
}))

function Login() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const initialLoginUserData = { email: '', password: '' }
  const initialCreateUserData = { name: '', email: '', password: '' }
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const user = useSelector((state: RootState) => state?.user?.user)
  const [typeOfMenu, setTypeOfMenu] = useState<boolean>(true)
  console.log(user)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLoginUser = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await signIn(email, password)
    if (data) {
      let user: User = {
        email: data.user.email,
        username: data.user.username
      }
      dispatch(addUser(user))
      setCookie('vd_shop_jwt', data.jwt, 1)
      handleClose()
    } else {
      console.log(error)
      setErrorMessage(error.data[0].messages[0].message)
    }
    setLoading(false)
  }
  const handleCreateUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true)
    const { data, error } = await signUp(username, email, password)
    if (data) {
      setCookie('vd_shop_jwt', data.user.jwt, 1)
      dispatch(addUser(data.user))
    } else {
      console.log(error)
      setErrorMessage(error.data[0].messages[0].message)
    }
    setLoading(false)
  }
  return (
    <>
      {!user ? (
        <Button onClick={handleClick}>Login</Button>
      ) : (
        <Button onClick={handleClick}>Account</Button>
      )}
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={clsx(classes.darkBackground)}
      >
        <LoadingSpinner isLoading={loading} local />
        <Grid container className={classes.paper}>
          <Grid container spacing={3}>
            {typeOfMenu ? (
              <Grid container spacing={3}>
                <Grid
                  item
                  container
                  alignItems='center'
                  direction='column'
                >
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                    Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <Formik
                    initialValues={initialLoginUserData}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                      password: Yup.string()
                        .min(
                          6,
                          'Password is too short - should be 8 digits minimum.'
                        )
                        .matches(
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                          'Password has to have at least 6 letters, one numeric digit, one uppercase and one lowercase letter.'
                        )
                        .required('Password is required')
                    })}
                    onSubmit={(values, actions) => {
                      const { email, password } = values
                      const { setSubmitting } = actions
                      handleLoginUser(email, password)
                      setSubmitting(false)
                    }}
                    validateOnChange={false}
                  >
                    {(props) => (
                      <Form>
                        <CustomInput
                          label='Email'
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          name='email'
                          autoComplete='email'
                          type='text'
                          disabled={props.isSubmitting}
                        />
                        <CustomInput
                          label='Password'
                          variant='outlined'
                          margin='normal'
                          type={passwordVisible ? 'text' : 'password'}
                          required
                          fullWidth
                          name='password'
                          autoComplete='current-password'
                          disabled={props.isSubmitting}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                  }
                                  edge='end'
                                >
                                  {passwordVisible ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <Typography color='error'>
                          {errorMessage}
                        </Typography>
                        <Button
                          fullWidth
                          variant='contained'
                          color='primary'
                          className={classes.submit}
                          disabled={props.isSubmitting}
                          type='submit'
                        >
                          Sign In
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3}>
                <Grid
                  item
                  container
                  direction='column'
                  alignItems='center'
                >
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                    Sign up
                  </Typography>
                </Grid>
                <Grid item>
                  <Formik
                    initialValues={initialCreateUserData}
                    validationSchema={Yup.object({
                      name: Yup.string().required(
                        'Name or Username is required'
                      ),
                      email: Yup.string()
                        .min(
                          3,
                          'Name or Username is too short - should be 3 digits minimum.'
                        )
                        .email('Invalid email address')
                        .required('Email is required'),
                      password: Yup.string()
                        .min(
                          6,
                          'Password is too short - should be 8 digits minimum.'
                        )
                        .matches(
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                          'Password has to have at least 6 letters, one numeric digit, one uppercase and one lowercase letter.'
                        )
                        .required('Password is required')
                    })}
                    onSubmit={(values, actions) => {
                      const { name, email, password } = values
                      const { setSubmitting } = actions
                      handleCreateUser(name, email, password)
                      setSubmitting(false)
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                  >
                    {(props) => (
                      <Form>
                        <CustomInput
                          label='Name'
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          name='name'
                          autoComplete='name'
                          type='text'
                          disabled={props.isSubmitting}
                        />
                        <CustomInput
                          label='Email'
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          name='email'
                          autoComplete='email'
                          type='text'
                          disabled={props.isSubmitting}
                        />
                        <CustomInput
                          label='Password'
                          variant='outlined'
                          margin='normal'
                          type={passwordVisible ? 'text' : 'password'}
                          required
                          fullWidth
                          name='password'
                          autoComplete='current-password'
                          disabled={props.isSubmitting}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                  }
                                  edge='end'
                                >
                                  {passwordVisible ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        {errorMessage}
                        <Button
                          fullWidth
                          variant='contained'
                          color='primary'
                          className={classes.submit}
                          disabled={props.isSubmitting && !props.isValid}
                          type='submit'
                        >
                          Sign up
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            )}
            <Grid
              container
              item
              direction='row'
              justify='center'
              alignContent='center'
              alignItems='center'
            >
              <Grid item xs={5}>
                <Divider />
              </Grid>
              <Grid container justify='center' item xs={2}>
                <Box component='span'>or</Box>
              </Grid>
              <Grid item xs={5}>
                <Divider />
              </Grid>
            </Grid>
            <Grid container item spacing={2} justify='center'>
              <Grid item>
                <Button
                  color='default'
                  variant='outlined'
                  startIcon={<MoodIcon />}
                  className={classes.loginButton}
                >
                  Continue with Google
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='default'
                  variant='outlined'
                  startIcon={<MoodIcon />}
                  className={classes.loginButton}
                >
                  Continue with Facebook
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='default'
                  variant='outlined'
                  startIcon={<MoodIcon />}
                  className={classes.loginButton}
                >
                  Continue with Github
                </Button>
              </Grid>
            </Grid>
            {!typeOfMenu ? (
              <Grid item container spacing={1} justify='center'>
                <Grid item>Already have an account?</Grid>
                <Grid item>
                  <Link
                    component='span'
                    onClick={() => setTypeOfMenu(!typeOfMenu)}
                  >
                    Log in now
                  </Link>
                </Grid>
              </Grid>
            ) : (
              <Grid item container spacing={1} justify='center'>
                <Grid item>Don't have an account?</Grid>
                <Grid item>
                  <Link
                    component='span'
                    onClick={() => setTypeOfMenu(!typeOfMenu)}
                  >
                    Create an account
                  </Link>
                </Grid>
              </Grid>
            )}
            <Grid item>
              <Copyright />
            </Grid>
          </Grid>
        </Grid>
      </Menu>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(addUser, dispatch)
  }
}

export default connect(
  (state: RootState) => state,
  mapDispatchToProps
)(Login)
