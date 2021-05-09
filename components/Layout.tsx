import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/reducer/root'
import { bindActionCreators } from 'redux'
import { deleteUser } from '../redux/actions/userAction'
import { useRouter } from 'next/router'
import Login from './Login'
import AccountMenu from './AccountMenu'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'This is the default title'
}: Props) => {
  const history = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state?.user?.user)
  console.log(user)
  const handleLogout = () => {
    dispatch(deleteUser())
    history.push('/account/sign-in')
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <header>
        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href='/products'>
            <a>Product List</a>
          </Link>{' '}
          |{' '}
          <Link href='/api/products'>
            <a>Products API</a>
          </Link>
          | {!user ? <Login /> : <AccountMenu />}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(deleteUser, dispatch)
  }
}

export default connect(
  (state: RootState) => state,
  mapDispatchToProps
)(Layout)
