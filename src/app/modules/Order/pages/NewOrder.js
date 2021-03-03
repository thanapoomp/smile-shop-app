/* eslint-disable no-restricted-imports */
import React from "react";
import Grid from "@material-ui/core/Grid";
import ProductGroupsBar from "../components/ProductGroupsBar";
import ProductItemList from "../components/ProductItemList";
import CartItemList from "../components/CartItemList";
import ProductDialog from "../components/ProductDialog";
function NewOrder() {
  return (
    <Grid container>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        item
        xs={12}
        lg={9}
        spacing={3}
      >
        <Grid item lg={12} >
          <ProductGroupsBar></ProductGroupsBar>
        </Grid>
        <Grid item lg={12}>
          <ProductItemList></ProductItemList>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3}>
        <CartItemList showCheckout showDelete></CartItemList>
      </Grid>
      <ProductDialog></ProductDialog>
    </Grid>
  );
}

export default NewOrder;
