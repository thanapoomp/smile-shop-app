/* eslint-disable no-restricted-imports */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function ProductItem() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="https://thumbs.dreamstime.com/z/new-product-stamp-round-grunge-sign-label-181923461.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Product Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button fullWidth size="small" color="primary">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
export default ProductItem;
