import React from 'react'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
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
      navLinks={['bla', 'mla', 'dra'].map((category: any) => category)}
    >
      <Typography>CONTENT</Typography>
    </Layout>
  )
}

export const getStaticProps = wrapper.getServerSideProps(
  (store) => async ({ locale }) => {
    console.log(locale)
    let user = { email: 'data.user.email', username: 'data.user.username' }
    store.dispatch(addUser(user))
    const res = await fetch('https://jsonplaceholder.typicode.com/albums')
    const categories = await res?.json()
    return {
      props: { navLinks: null }
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
