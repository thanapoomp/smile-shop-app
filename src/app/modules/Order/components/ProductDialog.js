/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import FormikTextFieldNumber from "../../_FormikUseFormik/components/FormikTextFieldNumber";
import * as orderRedux from "../_redux/orderRedux";
import red from "@material-ui/core/colors/red";
import ProductItem from "./ProductItem";
import * as productAxios from '../../Product/_redux/productAxios'
import { swalError } from "../../Common/components/SweetAlert";

function ProductDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState({})
  const orderReducer = useSelector(({ order }) => order);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.quantity) {
          errors.quantity='Required'
      }

      if (values.quantity > product.stock) {
          errors.quantity='Out of stock'
      }

      return errors;
    },
    initialValues: {
      quantity: 1,
    },
    onSubmit: (values) => {
      dispatch(orderRedux.actions.selectProduct(0));
    },
  });

  const loadStock = () => {
    if (orderReducer.selectedProductId) {
      productAxios.getProduct(orderReducer.selectedProductId).then((res) => {
          if (res.data.isSuccess) {
              setProduct(res.data.data)
          } else {
              swalError('Error',res.data.message)
          }
      }).catch((err) => {
          swalError('Error',err.message)
      });
    }
  };

  React.useEffect(() => {
    formik.setFieldValue("quantity", 1);
    loadStock();
    if (orderReducer.selectedProductId) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [orderReducer.selectedProductId]);

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} style={{minWidth:500}}>
      {orderReducer.selectedProductId && (
        <>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle id="simple-dialog-title">
              Add Product To Cart
            </DialogTitle>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <ProductItem
                  productId={orderReducer.selectedProductId}
                  allowClick={false}
                ></ProductItem>
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormikTextFieldNumber
                  formik={formik}
                  name="quantity"
                  label="Quantity"
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 10 }}>
              <Grid item xs={6} lg={6}>
                <Button
                  fullWidth
                  style={{ color: red[300] }}
                  onClick={() => {
                    dispatch(orderRedux.actions.selectProduct(0));
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} lg={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color={"primary"}
                >
                  Ok
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Dialog>
  );
}

export default ProductDialog;
