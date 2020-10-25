import * as React from "react";
import { ListItem } from "./ListItem";
import { Product } from "../interfaces";
import Grid from "@material-ui/core/Grid";

type Props = {
  items: Product[];
};

const List = ({ items }: Props) => (
  <Grid container wrap="nowrap">
    {items &&
      items.map((item) => (
        <ListItem
          id={item.id}
          key={item.id}
          title={item.title}
          src={item.src}
          channel={item.channel}
          createdAt={item.createdAt}
          views={item.views}
        />
      ))} 
  </Grid>
);

export default List;
