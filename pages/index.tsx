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

function Index({ navLinks }: { navLinks: Array<Object> }) {
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
  (store) => async({locale})=> {
    let user = { email: 'data.user.email', username: 'data.user.username' }
    store.dispatch(addUser(user))
    const res = await fetch(`http://localhost:1337/${locale}/categories/getMainCategories`)
    const categories = await res?.json()
    console.log(categories)
    return {
      props: {
        navLinks: categories?.map((n: any) => ({name:n.name, idCategory: n.idCategory}))
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
