import React, { useCallback, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { signIn, signInWithGoogle } from '../../services/auth'
import { setCookie } from '../../services/cookie'
import Copyright from '../../components/Copyright'
import { addUser } from '../../redux/actions/userAction'
import { User } from '../../interfaces/userTypes'
import { RootState } from '../../redux/reducer/root'
import { wrapper } from '../../redux/store'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { CustomInput } from '../../components/CustomInput'
import { IconButton, InputAdornment } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  }
}))
type UserLogin = {
  email: string
  password: string
}
function SignIn() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const initialUser = { email: '', password: '' }
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const history = useRouter()

  const handleGoogleAuth = useCallback(async () => {
    let user = await signInWithGoogle()
    if (user) {
      setCookie('vd_shop_jwt', user.jwt, 1)
    }
  }, [])

  const handleSubmit = async (email: string, password: string) => {
    let { data, error } = await signIn(email, password)

    if (data) {
      let user: User = {
        email: data.user.email,
        username: data.user.username
      }
      dispatch(addUser(user))
      setCookie('vd_shop_jwt', data.jwt, 1)
      history.push('/')
    } else {
      console.log(error)
      setErrorMessage(error.data[0].messages[0].message)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Formik
          initialValues={initialUser}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .min(
                8,
                'Password is too short - should be 8 digits minimum.'
              )
              .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                'Password has to have at least 6 letters, one numeric digit, one uppercase and one lowercase letter.'
              )
              .required('Password is required')
          })}
          onSubmit={({ email, password }) => {
            handleSubmit(email, password)
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
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={props.isSubmitting || !props.isValid}
                type='submit'
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <form className={classes.form} noValidate>
          {/* <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          /> */}
          <Typography variant='subtitle2' color='error'>
            {errorMessage}
          </Typography>

          <Button
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
            onClick={handleGoogleAuth}
          >
            With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/account/sing-up/' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  let user = { email: 'from server', username: 'from server' }
  store.dispatch(addUser(user))
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(addUser, dispatch)
  }
}

export default connect(
  (state: RootState) => state,
  mapDispatchToProps
)(SignIn)
