import React, { ReactNode } from "react";
import Head from "next/head";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/root";
import { bindActionCreators } from "redux";
import { deleteUser } from "../../../redux/actions/userAction";
import { useRouter } from "next/router";
import { Header, TextButton } from "vd-ui-components";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Box, Container } from "@material-ui/core";
import Login from "../../Login";

type Props = {
  children?: ReactNode;
  title?: string;
  navLinks?: Array<string>;
};

const Layout = ({
  children,
  title = "This is the default title",
  navLinks = [],
}: Props) => {
  const history = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user?.user);
  console.log(user);
  const handleLogout = () => {
    dispatch(deleteUser());
    history.push("/account/sign-in");
  };
  const loggedInLinks = [
    <TextButton
      size="small"
      color="primary"
      startIcon={<ShoppingCartOutlinedIcon />}
      isCompact="sm"
    >
      Cart
    </TextButton>,
    <TextButton
      size="small"
      color="primary"
      startIcon={<AccountCircleOutlinedIcon />}
      isCompact="sm"
    >
      Account
    </TextButton>,
  ];
  const loggedOutLinks = [
    <TextButton
      size="small"
      color="primary"
      startIcon={<ShoppingCartOutlinedIcon />}
      isCompact="sm"
    >
      Cart
    </TextButton>,
    <Login />,
  ];
  return (
    <Box display="flex" height="100%" flexDirection="column" maxWidth="xl" >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Header
          loggedInActionButtons={loggedInLinks}
          loggedOutActionButtons={loggedOutLinks}
        />
        <nav></nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Box>
  );
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(deleteUser, dispatch),
  };
};

export default connect((state: RootState) => state, mapDispatchToProps)(Layout);
