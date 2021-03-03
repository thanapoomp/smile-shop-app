/* eslint-disable no-restricted-imports */
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

function CartItemFooter(props) {
  const orderReducer = useSelector(({ order }) => order);
  return (
    <ListItem divider>
      <Grid container>
        <Grid item xs={9} lg={9}>
          Total
        </Grid>
        <Grid item xs={3} lg={3}>
          {orderReducer.total}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default CartItemFooter;
