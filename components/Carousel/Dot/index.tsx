import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import clsx from "clsx";
import React, { ReactElement } from "react";
import { DotProps } from "react-multi-carousel";

export const CustomDot = ({
  index,
  onClick,
  active,
  className,
  activeClassName,
  image,
}: DotProps & {
  className?: string;
  activeClassName?: string;
  image?: (index: number) => string;
}) => {
  return (
    <Card
      className={clsx(className, {
        [`${activeClassName}`]: active,
      })}
      elevation={active ? 6 : 1}
    >
      <CardActionArea
        onClick={(e) => {
          onClick && onClick();
          e.preventDefault();
        }}
      >
        <CardMedia
          image={image && index !== undefined ? image(index) : undefined}
          style={{ height: 60, width: 60 }}
        />
      </CardActionArea>
    </Card>
  );
};
