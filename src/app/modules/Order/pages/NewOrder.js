/* eslint-disable no-restricted-imports */
import React from "react";
import Grid from "@material-ui/core/Grid";
import ProductGroupsBar from "../components/ProductGroupsBar";
import ProductItemList from "../components/ProductItemList";
function NewOrder() {
  return (
    <Grid container>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        items
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
      <Grid container items xs={12} lg={3}></Grid>
    </Grid>
  );
}

export default NewOrder;
