import React from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../components/ProTip";
import Link from "../components/Link";
import Copyright from "../components/Copyright";
import Layout from "../components/Layout";
import { RootState } from "../redux/reducer/root";
import { wrapper } from "../redux/store";
import { addUser } from "../redux/actions/userAction";
import { LineNavbar, TextButton } from "vd-ui-components";


function Index({
  categories,
}: {
  categories: Array<{ id: number; name: string; information: string }>
}) {
  let user = useSelector((state: RootState) => state?.user?.user);
  let text;
  if (user) {
    text = <p>Hi {user.username}!</p>;
  } else {
    text = <p>Not active user</p>;
  }

  return (
    <Container maxWidth="sm">
      <Layout title="Home | Next.js + TypeScript Example">
        <Box my={4}>
          <LineNavbar>
            {categories.map(({id, name}) => (
              <TextButton key={id} size="small" color="primary">
                {name}
              </TextButton>
            ))}
          </LineNavbar>
          <Typography variant="h4" component="h1" gutterBottom>
            {text}
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Layout>
    </Container>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  let user = { email: "data.user.email", username: "data.user.username" };
  store.dispatch(addUser(user));
  const res = await fetch("http://localhost:1337/fr/categories/getMainCategories");
  const categories = await res.json();
  return {
    props: {
      categories,
    },
  };
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(addUser, dispatch),
  };
};

export default connect((state: RootState) => state, mapDispatchToProps)(Index);
