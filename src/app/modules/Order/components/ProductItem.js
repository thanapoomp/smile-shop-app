/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import * as productAxios from "../../Product/_redux/productAxios";
import * as swal from "../../Common/components/SweetAlert";
import * as orderRedux from "../_redux/orderRedux";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function ProductItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState({});

  const loadProduct = () => {
    productAxios
      .getProduct(props.productId)
      .then((res) => {
        if (res.data.isSuccess) {
          setProduct(res.data.data);
        } else {
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  React.useEffect(() => {
    loadProduct();
  }, [props.productId]);

  return (
    <Card
      className={classes.root}
      onClick={() => {
        if (props.allowClick) {
          dispatch(orderRedux.actions.selectProduct(product.id));
        }
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="https://thumbs.dreamstime.com/z/new-product-stamp-round-grunge-sign-label-181923461.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Grid container>
            <Grid item xs={6} lg={6}>
              {" "}
              <Typography variant="body2" color="textSecondary" component="p">
                {product.price}฿
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                stock: {product.stock}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ProductItem.propTypes = {
  productId: PropTypes.number,
  allowClick: PropTypes.bool,
};

ProductItem.defaultProps = {
  productId: 0,
  allowClick: true,
};

export default ProductItem;
