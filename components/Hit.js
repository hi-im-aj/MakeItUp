import { useContext } from "react";
import Link from "next/link";
import CartContext from "../context/cart/CartContext";
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function ({ hit }) {
  const { name, image, price, objectID } = hit;
  const { addToCart } = useContext(CartContext);
  const href = "product/" + objectID;
  const media = image ? (
    <Link href={href}>
      <CardMedia component="img" sx={{ height: "15rem", cursor: "pointer" }} title={name} image={image.url} />
    </Link>
  ) : null;

  return (
    <Card key={objectID}>
      {media}
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="p" color="primary">
          {price.formatted_with_code}
        </Typography>
        <CardActions>
          <Button onClick={() => addToCart(objectID)}>Add To Cart</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
