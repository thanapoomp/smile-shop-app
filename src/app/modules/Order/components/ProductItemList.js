/* eslint-disable no-restricted-imports */
import React from "react";
import Grid from "@material-ui/core/Grid";
import ProductItem from "./ProductItem";
import Paper from "@material-ui/core/Paper";
import * as productAxios from "../../Product/_redux/productAxios";
import * as swal from "../../Common/components/SweetAlert";
import { useSelector } from "react-redux";

function ProductItemList(props) {
  const [products, setProducts] = React.useState([]);

  const orderReducer = useSelector(({ order }) => order);

  const loadProductByGroupId = (productGroupId) => {
    productAxios
      .getProductByProductGroupId(productGroupId)
      .then((res) => {
        if (res.data.isSuccess) {
          setProducts(res.data.data);
        } else {
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  React.useEffect(() => {
    loadProductByGroupId(orderReducer.selectedProductGroupId);
  }, [orderReducer.selectedProductGroupId]);

  return (
    <Paper
      style={{ width: "100%", minHeight: 300, paddingRight: 5, paddingLeft: 5 }}
    >
      <Grid container spacing={5}>
        {products.map((item) => (
          <Grid key={item.id} item xs={12} lg={3}>
            <ProductItem productId={item.id}></ProductItem>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default ProductItemList;
