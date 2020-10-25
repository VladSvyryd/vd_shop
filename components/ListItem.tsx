import React, { FC } from "react";
import Link from "next/link";
import { Product } from "../interfaces";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export type ListItemProps = {
  isLoading?: boolean;
  onClick?: () => void;
};

export const ListItem: FC<ListItemProps & Product> = ({
  id,
  title,
  src,
  views,
  createdAt,
  channel,
}) => {
 

  return (
    <Link key={id} href="/products/[id]" as={`/products/${id}`}>
      <Box width={210} marginRight={0.5} my={5}>
        <img style={{ width: 210, height: "auto" }} alt={title} src={src} />
        <Box pr={2}>
          <Typography gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography display="block" variant="caption" color="textSecondary">
            {channel}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {`${views} • ${createdAt}`}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};
