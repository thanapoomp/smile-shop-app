/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import {useHistory} from 'react-router-dom'
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import CartItemList from "../components/CartItemList";
import { useFormik } from "formik";
import FormikTextFieldNumber from "../../_FormikUseFormik/components/FormikTextFieldNumber";
import {useDispatch, useSelector} from 'react-redux'
import * as orderRedux from '../_redux/orderRedux'

function Checkout() {
  const dispatch = useDispatch()
  const orderReducer = useSelector(({order})=> order)
  let history = useHistory()
  const getTotal = () => {
    let total = orderReducer.cartItems.reduce(function(prev, cur) {
      return prev + cur.price;
    }, 0);
    return total;
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (values.discount > values.total) {
        errors.discount = 'Invalid discount'
      }

      if (parseInt(values.discount) < -1) {
        errors.discount = 'Invalid discount'
      }

      return errors;
    },
    initialValues: {
      total:getTotal(),
      discount:0,
      netTotal:0
    },
    onSubmit: (values) => {
        //TODO: push API
        dispatch(orderRedux.actions.reset())
        history.push('/order/new')
        formik.setSubmitting(false)
    },
  });

  React.useEffect(() => {
    let discount = parseInt(formik.values.discount)? parseInt(formik.values.discount) : 0
    let netTotal = getTotal() - discount
    formik.setFieldValue('netTotal',netTotal)
  }, [formik.values.total,formik.values.discount])

  return (
    <div style={{ flexGrow: 1 }}>
      <Paper elevation={3} style={{ width: "100%" }}>
        <Typography style={{ marginLeft: 10, marginTop: 20 }} variant="h4">
          Checkout
        </Typography>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item lg={6} xs={6}>
            <CartItemList
              showCheckout={false}
              showDelete={false}
            ></CartItemList>
          </Grid>
          <Grid item lg={6} xs={6}>
            <Paper
              style={{ marginRight: 10, paddingLeft: 10, paddingRight: 10 }}
            >
              <form onSubmit={formik.handleSubmit}>
                {/* Start total */}
                <Grid item xs={12} lg={12}>
                  <FormikTextFieldNumber
                    formik={formik}
                    name="total"
                    label="Total"
                    disabled
                  />
                </Grid>

                {/* Start discount */}
                <Grid item xs={12} lg={12} style={{marginTop:10}}>
                  <FormikTextFieldNumber
                    formik={formik}
                    name="discount"
                    label="Discount"
                  />
                </Grid>

                {/* Start net total */}
                <Grid item xs={12} lg={12} style={{marginTop:10}}>
                  <FormikTextFieldNumber
                    formik={formik}
                    name="netTotal"
                    label="Net Total"
                    disabled
                  />
                </Grid>

                {/* Start submit */}
                <Grid item xs={12} lg={12} style={{marginTop:20}}>
                  <Button type="submit" color="primary" disabled={formik.isSubmitting} fullWidth variant="contained">
                    Submit
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Checkout;
