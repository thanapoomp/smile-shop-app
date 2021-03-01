/* eslint-disable no-restricted-imports */
import React from "react";
import Grid from "@material-ui/core/Grid";
import ProductItem from "./ProductItem";
import Paper from "@material-ui/core/Paper";

function ProductItemList(props) {
  return (
    <Paper style={{ width: "100%", minHeight: 300,paddingRight:5,paddingLeft:5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
        <Grid item xs={12} lg={3}>
          <ProductItem></ProductItem>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductItemList;
