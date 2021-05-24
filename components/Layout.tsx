import React, { ReactNode } from 'react'
import Head from 'next/head'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/reducer/root'
import { bindActionCreators } from 'redux'
import { deleteUser } from '../redux/actions/userAction'
import { useRouter } from 'next/router'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { Box, Container, Typography } from '@material-ui/core'
import Login from './Login'
import {
  Footer,
  Header,
  LineNavbar,
  NewsletterForm,
  SearchForm,
  TextButton
} from 'vd-ui-components'
import Facebook from '@/assets/icons/facepook.svg'
import Twitter from '@/assets/icons/twitter.svg'
import Instagram from '@/assets/icons/instagram.svg'
import Youtube from '@/assets/icons/youtube.svg'
import WiFi from '@/assets/icons/wifi.svg'
import ApplePay from '@/assets/icons/apple_pay.svg'
import Klarna from '@/assets/icons/klarna.svg'
import Paypal from '@/assets/icons/paypal.svg'
import MasterCard from '@/assets/icons/masterCard.svg'
import Visa from '@/assets/icons/visa.svg'
import { LinkStack } from 'vd-ui-components/dist/components/Footer'

type Props = {
  children?: ReactNode
  title?: string
  navLinks?: Array<string>
}
const mainLinkStacks: Array<LinkStack> = [
  {
    title: 'Customer Service',
    type: 'column',
    items: [
      { title: 'Help & FAQ' },
      { title: 'Shipment tracking' },
      { title: 'Delivery and returns' },
      { title: '15% - First Buy Sale' },
      { title: 'Legal Notice' }
    ]
  },
  {
    title: 'About us',
    type: 'column',
    items: [
      { title: 'Shop and Team' },
      { title: 'Blog' },
      { title: 'Business Model' },
      { title: 'Reviews' }
    ]
  },
  {
    title: 'Connect with us',
    type: 'row',
    items: [
      { icon: <img src={Facebook} alt='Facebook Logo' /> },
      { icon: <img src={Twitter} alt='Twitter Logo' /> },
      { icon: <img src={Instagram} alt='Instagram Logo' /> },
      { icon: <img src={Youtube} alt='Youtube Logo' /> },
      { icon: <img src={WiFi} alt='WiFi Logo' /> }
    ]
  },
  {
    title: 'Payment methods',
    type: 'row',
    items: [
      { icon: <img src={ApplePay} alt='ApplePay Logo' /> },
      { icon: <img src={Klarna} alt='Klarna Logo' /> },
      { icon: <img src={Paypal} alt='Paypal Logo' /> },
      { icon: <img src={MasterCard} alt='MasterCard Logo' /> },
      { icon: <img src={Visa} alt='Visa Logo' /> }
    ]
  }
]
const secondaryLinkStack: LinkStack = {
  title: 'Copyright © V & D Shop Inc. All rights reserved.',
  type: 'row',
  items: [
    { title: 'Help & FAQ' },
    { title: 'Shipment tracking' },
    { title: 'Delivery and returns' },
    { title: '15% - First Buy Sale' },
    { title: 'Legal Notice' }
  ]
}
const Layout = ({
  children,
  title = 'This is the default title',
  navLinks = []
}: Props) => {
  const history = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state?.user?.user)

  const loggedInLinks = [
    <TextButton
      size='small'
      color='primary'
      startIcon={<ShoppingCartOutlinedIcon />}
      isCompact='sm'
    >
      Cart
    </TextButton>,
    <TextButton
      size='small'
      color='primary'
      startIcon={<AccountCircleOutlinedIcon />}
      isCompact='sm'
    >
      Account
    </TextButton>
  ]
  const loggedOutLinks = [
    <TextButton
      size='small'
      color='primary'
      startIcon={<ShoppingCartOutlinedIcon />}
      isCompact='sm'
    >
      Cart
    </TextButton>,
    <Login />
  ]
  return (
    <Container
      maxWidth='xl'
      disableGutters
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <Header
        loggedInActionButtons={loggedInLinks}
        loggedOutActionButtons={loggedOutLinks}
        logo={
          <Typography variant={'h3'} variantMapping={{ h3: 'h1' }}>
            V&D Shop
          </Typography>
        }
        middleSection={
          <SearchForm placeholder={'what are you looking for?'} />
        }
        navBarSection={
          <LineNavbar>
            {navLinks.map((link) => (
              <TextButton size='small' color='primary'>
                {link}
              </TextButton>
            ))}
          </LineNavbar>
        }
      />
      <Box flexGrow={1}>{children}</Box>
      <Footer
        searchSection={
          <NewsletterForm
            title='Sign up for our newsletter'
            subtitle='Receive our latest updates.'
            inputValue='This is value'
            inputProps={{ placeholder: 'This is placeholder' }}
            theme={'secondary'}
            onChange={() => {}}
            onPressSend={() => {}}
          />
        }
        mainLinkStacks={mainLinkStacks}
        secondaryLinkStack={secondaryLinkStack}
      />
    </Container>
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
