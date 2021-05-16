import React from 'react'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@/components/Link'
import Copyright from '@/components/Copyright'
import Layout from '@/components/Layout'
import { RootState } from '../redux/reducer/root'
import { wrapper } from '../redux/store'
import { addUser } from '../redux/actions/userAction'

function Index({ navLinks }: { navLinks: Array<string> }) {
  let user = useSelector((state: RootState) => state?.user?.user)
  let text
  if (user) {
    text = <p>Hi {user.username}!</p>
  } else {
    text = <p>Not active user</p>
  }

  return (
    <Layout
      title='Home | Next.js + TypeScript Example'
      navLinks={navLinks}
    >
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          {text}
        </Typography>
        <Link href='/about' color='secondary'>
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, locale }) => {
    console.log(locale)
    let user = { email: 'data.user.email', username: 'data.user.username' }
    store.dispatch(addUser(user))
    const res = await fetch('https://jsonplaceholder.typicode.com/albums')
    const navLinks = await res.json()
    return {
      props: {
        navLinks: navLinks.map((n: any) => n.title.split(' ')?.[0])
      }
    }
  }
)

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(addUser, dispatch)
  }
}

export default connect(
  (state: RootState) => state,
  mapDispatchToProps
)(Index)
