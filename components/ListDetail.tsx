import * as React from "react";

import { Product } from "../interfaces";

type ListDetailProps = {
  item: Product;
};

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.title}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail;
