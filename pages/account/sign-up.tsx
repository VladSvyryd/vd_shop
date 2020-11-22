import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { setCookie } from '../../services/cookie'
import Copyright from '../../components/Copyright'
import { signUp } from '../../services/auth'
import LoadingSpinner from '../../components/Loading/LoadingSpinner'
import { useRouter } from 'next/router'
import { addUser } from '../../redux/actions/userAction'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
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
  }
}))

export default function SignUp() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const initialUser = { name: '', email: '', password: '' }
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const history = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true)
    const { data, error } = await signUp(username, email, password)
    if (data) {
      setCookie('vd_shop_jwt', data.user.jwt, 1)
      dispatch(addUser(data.user))
      history.push('/')
    } else {
      console.log(error)
      setErrorMessage(error.data[0].messages[0].message)
    }
    setLoading(false)

    // console.log(getCookie('vd_shop_jwt'));
  }

  return (
    <Container component='main' maxWidth='xs'>
      <LoadingSpinner isLoading={loading} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Formik
          initialValues={initialUser}
          validationSchema={Yup.object({
            name: Yup.string().required('Name or Username is required'),
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
            handleSubmit(name, email, password)
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
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
