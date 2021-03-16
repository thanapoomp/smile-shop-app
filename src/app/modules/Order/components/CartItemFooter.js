/* eslint-disable no-restricted-imports */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import NumberFormat from 'react-number-format';
import { Typography } from "@material-ui/core";

function CartItemFooter(props) {
  const orderReducer = useSelector(({ order }) => order);

  const getTotal = () => {
    let total = orderReducer.cartItems.reduce(function(prev, cur) {
      return prev + cur.price;
    }, 0);
    return total;
  };
  
  return (
    <ListItem divider>
      <Grid container>
        <Grid item xs={9} lg={9}>
        <Typography variant="h5">Total</Typography>
        </Grid>
        <Grid container item xs={2} lg={2} alignContent="center" alignItems="center" justify="flex-end">
          <Typography variant="h5">
          <NumberFormat
            value={getTotal()}
            displayType={"text"}
            thousandSeparator={true}
          />
          </Typography>
        </Grid>
        <Grid item xs={1} lg={1}></Grid>
      </Grid>
    </ListItem>
  );
}

export default CartItemFooter;
