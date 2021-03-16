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
import * as productAxios from "../../Product/_redux/productAxios";
import { swalError } from "../../Common/components/SweetAlert";
import { DialogContent } from "@material-ui/core";
import ProductItem from '../components/ProductItem'

function ProductDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const orderReducer = useSelector(({ order }) => order);

  const dispatch = useDispatch();

  const loadProduct = () => {
    if (orderReducer.selectedProductId) {
      productAxios
        .getProduct(orderReducer.selectedProductId)
        .then((res) => {
          if (res.data.isSuccess) {
            setProduct(res.data.data);
          } else {
            swalError("Error", res.data.message);
          }
        })
        .catch((err) => {
          swalError("Error", err.message);
        });
    }
  };

  const validateNumber = () => {
    debugger
    let numberInCart = 0;
    let itemInCart = [...orderReducer.cartItems].find((obj) => {
      return obj.id === orderReducer.selectedProductId;
    });

    if (itemInCart) {
      numberInCart = itemInCart.quantity;
    }

    let numberToCheckOut = parseInt(formik.values.quantity) + numberInCart;
    return product.stock >= numberToCheckOut;
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.quantity) {
        errors.quantity = "Required";
      }

      if (values.quantity < 0) {
        errors.quantity = "Invalid number";
      }

      //validate quantity
      if (!validateNumber()) {
        errors.quantity = "Out of stock";
      }

      return errors;
    },
    initialValues: {
      quantity: 1,
    },
    onSubmit: (values) => {
      let cartItemsToUpdate = [...orderReducer.cartItems];

      //หาว่า product ที่จะเพิ่ม มีอยู่แล้วหรือเปล่า
      let itemToUpdate = cartItemsToUpdate.find((obj) => {
        return obj.id === product.id;
      });
      if (itemToUpdate) {
        //มีอยู่แล้ว เพิ่ม quantity เข้าไป
        itemToUpdate.quantity += parseInt(values.quantity);
      } else {
        //ยังไม่มี
        itemToUpdate = {
          id: product.id,
          name: product.name,
          quantity: parseInt(values.quantity),
        };
        cartItemsToUpdate.push(itemToUpdate);
      }

      itemToUpdate.price = parseInt(itemToUpdate.quantity) * product.price;
      dispatch(orderRedux.actions.updateCart(cartItemsToUpdate));
      dispatch(orderRedux.actions.selectProduct(0));
    },
  });

  React.useEffect(() => {
    loadProduct();
    formik.setFieldValue("quantity", 1);
    if (orderReducer.selectedProductId) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [orderReducer.selectedProductId]);

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth>
      {orderReducer.selectedProductId && (
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="simple-dialog-title">
            Add Product To Cart
          </DialogTitle>
          <DialogContent style={{width:'100%',height:'100%'}}>
            <Grid container spacing={3}>
              <Grid item xs={6} lg={6}>
                <ProductItem
                  productId={orderReducer.selectedProductId}
                  allowClick={false}
                ></ProductItem>
              </Grid>
              <Grid item xs={2} lg={2}>
                <Button onClick={()=> {
                  formik.setFieldValue('quantity',(parseInt(formik.values.quantity) - 1))
                }}>-</Button>
              </Grid>
              <Grid item xs={2} lg={2}>
                <FormikTextFieldNumber
                  formik={formik}
                  name="quantity"
                  label="Quantity"
                />
              </Grid>
              <Grid item xs={2} lg={2}>
                <Button onClick={() => {
                  formik.setFieldValue('quantity',(parseInt(formik.values.quantity) + 1))
                }}>+</Button>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 10 }} spacing={3}>
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
          </DialogContent>
        </form>
      )}
    </Dialog>
  );
}

export default ProductDialog;
