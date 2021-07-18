import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { RootState } from "../redux/reducer/root";
import { wrapper } from "../redux/store";
import { addUser } from "../redux/actions/userAction";
import { LayoutSwitch } from "@/components/LayoutSwitch";
import {
  VDPosterCard,
  Heading,
  VDPolaroidCard,
  RoundButton,
  ProductCard,
  Price,
} from "vd-ui-components";
import { Box, CardMedia, Divider, Grid, Typography } from "@material-ui/core";
import { Container } from "next/app";
import { useStyles } from "css";
import Image from "next/image";

const newProducts = [
  "https://source.unsplash.com/random/200x200?sig=1",
  "https://source.unsplash.com/random/200x200?sig=2",
  "https://source.unsplash.com/random/200x200?sig=3",
  "https://source.unsplash.com/random/200x200?sig=4",
  "https://source.unsplash.com/random/200x200?sig=5",
  "https://source.unsplash.com/random/200x200?sig=6",
  "https://source.unsplash.com/random/200x200?sig=7",
];
const productCards = [
  {
    title: "Handgefertigter Jute-Teppich Clover",
    subtitle: "Westwing Collection",
    endSubtitle:
      "75 % Jute, 24 % Baumwolle, 1 % Polyester, Beige, Weiß, Ø 120 cm (Größe S)",
    image: "https://source.unsplash.com/random/200x200?sig=8",
    extraInfo: "Special Info",
    rating: 2.5,
    priceBefore: "2345€",
    priceNow: "450€",
  },
  {
    title: "Handgefertigter Jute-Teppich Clover",
    subtitle: "Westwing Collection",
    endSubtitle:
      "75 % Jute, 24 % Baumwolle, 1 % Polyester, Beige, Weiß, Ø 120 cm (Größe S)",
    image: "https://source.unsplash.com/random/200x200?sig=9",
    extraInfo: "Special Info",
    rating: 2.5,
    priceBefore: "2345€",
    priceNow: "450€",
  },
  {
    title: "Handgefertigter Jute-Teppich Clover",
    subtitle: "Westwing Collection",
    endSubtitle:
      "75 % Jute, 24 % Baumwolle, 1 % Polyester, Beige, Weiß, Ø 120 cm (Größe S)",
    image: "https://source.unsplash.com/random/200x200?sig=10",
    extraInfo: "Special Info",
    rating: 2.5,
    priceBefore: "2345€",
    priceNow: "450€",
  },
  {
    title: "Handgefertigter Jute-Teppich Clover",
    subtitle: "Westwing Collection",
    endSubtitle:
      "75 % Jute, 24 % Baumwolle, 1 % Polyester, Beige, Weiß, Ø 120 cm (Größe S)",
    image: "https://source.unsplash.com/random/200x200?sig=11",
    extraInfo: "Special Info",
    rating: 2.5,
    priceBefore: "2345€",
    priceNow: "450€",
  },
  {
    title: "Handgefertigter Jute-Teppich Clover",
    subtitle: "Westwing Collection",
    endSubtitle:
      "75 % Jute, 24 % Baumwolle, 1 % Polyester, Beige, Weiß, Ø 120 cm (Größe S)",
    image: "https://source.unsplash.com/random/200x200?sig=12",
    extraInfo: "Special Info",
    rating: 2.5,
    priceBefore: "2345€",
    priceNow: "450€",
  },
  {
    title: "Handgefertigter Jute-Teppich Clover",
    subtitle: "Westwing Collection",
    endSubtitle:
      "75 % Jute, 24 % Baumwolle, 1 % Polyester, Beige, Weiß, Ø 120 cm (Größe S)",
    image: "https://source.unsplash.com/random/200x200?sig=13",
    extraInfo: "Special Info",
    rating: 2.5,
    priceBefore: "2345€",
    priceNow: "450€",
  },
];

function Index({ navLinks }: { navLinks: Array<Object> }) {
  let user = useSelector((state: RootState) => state?.user?.user);
  const [zoom, setZoom] = useState(false);
  const classes = useStyles();
  let text;
  if (user) {
    text = <p>Hi {user.username}!</p>;
  } else {
    text = <p>Not active user</p>;
  }
  const responsiveProductPageSlider = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      centerMode: true,
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1100 },
      centerMode: true,
      items: 1,
    },
    mobile: {
      breakpoint: { max: 1100, min: 0 },
      partialVisible: true,
      centerMode: false,
      partialVisibilityGutter: 40,
      items: 1,
    },
  };
  return (
    <LayoutSwitch
      layoutProps={{
        title: "Home | Next.js + TypeScript Example",
        navLinks: ["bla", "mla", "dra"].map((category: any) => category),
      }}
    >
      <VDPosterCard
        title={"Introducing the Rylie"}
        typographyBoxProps={{ maxWidth: "50%" }}
        subtitle={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        typographyBackType={"west"}
        typographyColor="secondary"
        backgroundUrl="https://picsum.photos/1200/768"
      />
      <Box py={10} px={1}>
        <Heading title="Hi, welcome to your dreams." className="" />
      </Box>
      <Container maxWidth="xl">
        <Box maxWidth={1460} display={"flex"} p={1}>
          <Grid container>
            <Grid item xs>
              <VDPolaroidCard
                title="Everyday Athleisure"
                subtitle={
                  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
                }
                imgAs={"cover"}
                img={"https://source.unsplash.com/random"}
                price={"399€"}
                coverPosition={{ top: 0, left: 0 }}
                background={"#FFFFFF"}
                withTypographyBackground
                buttons={[
                  <RoundButton color={"primary"}>Buy</RoundButton>,
                  <RoundButton color={"primary"}>More About</RoundButton>,
                ]}
              />
            </Grid>
            <Grid item xs>
              <VDPolaroidCard
                title="Everyday Athleisure"
                subtitle={
                  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
                }
                img={"https://source.unsplash.com/random"}
                price={"399€"}
                imgAs={"cover"}
                coverPosition={{ top: 0, left: 0 }}
                background={"#FFFFFF"}
                withTypographyBackground
                type={"south"}
                buttons={[
                  <RoundButton color={"primary"}>Buy</RoundButton>,
                  <RoundButton color={"primary"}>More About</RoundButton>,
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box py={14} px={1}>
        <Heading title="New Highlights" className="" />
      </Box>
      <Box style={{ maxWidth: 1460, padding: 8 }}>
        <Grid container spacing={1}>
          {productCards.map((product) => (
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard
                title={product.title}
                subtitle={product.subtitle}
                endSubtitle={product.endSubtitle}
                image={
                  <Image
                    alt="Mountains"
                    src={"https://source.unsplash.com/random/300x300?sig=1"}
                    layout="responsive"
                    width={300}
                    height={300}
                  />
                }
                rating={product.rating}
                price={<Price value={[product.priceBefore]} />}
              />
            </Grid>
          ))}
        </Grid>
        <Divider />
      </Box>
    </LayoutSwitch>
  );
}

export const getStaticProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale }: any) => {
      console.log(locale);
      // let user = { email: 'data.user.email', username: 'data.user.username' }
      // store.dispatch(addUser(user))
      // const res = await fetch('https://jsonplaceholder.typicode.com/albums')
      // const categories = await res?.json()
      return {
        props: { navLinks: null },
      };
    }
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: bindActionCreators(addUser, dispatch),
  };
};

export default connect((state: RootState) => state, mapDispatchToProps)(Index);
