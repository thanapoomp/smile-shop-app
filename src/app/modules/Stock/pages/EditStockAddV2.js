/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button, Typography } from "@material-ui/core/";
import FormikDropdown from "../../_FormikUseFormik/components/FormikDropdown";
import FormikTextField from "../../_FormikUseFormik/components/FormikTextField";
import FormikRadioGroup from "../../_FormikUseFormik/components/FormikRadioGroup";
import FormikTextFieldNumber from "../../_FormikUseFormik/components/FormikTextFieldNumber";
import * as productAxios from "../../Product/_redux/productAxios";
import * as productGroupAxios from "../../ProductGroup/_redux/productGroupAxios";
import * as swal from "../../Common/components/SweetAlert";
import * as stockAxios from '../_redux/stockAxios'

function EditStockAddV2(props) {
  const URL_AFTERSUBMIT = "/stock";
  const [actionType] = React.useState([
    { id: '1', name: "Add" },
    { id: '2', name: "Remove" },
  ]);

  const [productGroupList, setProductGroupList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);

  const calculate = () => {
    let amountBefore = parseInt(formik.values.amountBefore)
    let amountAfter = 0;
    let amountNumber = formik.values.amountNumber
      ? parseInt(formik.values.amountNumber)
      : 0;

    if (formik.values.productId) {
      if (formik.values.type === '1') {
        //add
        amountAfter = amountBefore + amountNumber;
      } else {
        //remove
        amountAfter = amountBefore - amountNumber;
      }
      //get amount before
      formik.setFieldValue("amountAfter", amountAfter);
    }
  };

  const loadProductGroupList = () => {
    productGroupAxios
      .getActiveProductGroups()
      .then((res) => {
        if (res.data.isSuccess) {
          setProductGroupList(res.data.data);
        } else {
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  const loadProductList = () => {
    productAxios
      .getProductByProductGroupId(formik.values.productGroupId)
      .then((res) => {
        if (res.data.isSuccess) {
          setProductList(res.data.data);
        } else {
          swal.swalError("error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("error", err.message);
      });
  };

  const getProductStock = () => {
    if (formik.values.productId) {
      productAxios.getProduct(formik.values.productId).then((res) => {
        if (res.data.isSuccess) {
          formik.setFieldValue('amountBefore',res.data.data.stock)
        } else {
          swal.swalError('error',res.data.message)
        }
      }).catch((err) => {
        swal.swalError('error',err.message)
      })
    }else{
      formik.setFieldValue('amountBefore',0)
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      productGroupId: 0,
      productId: 0,
      amountBefore: 0,
      amountNumber: 0,
      amountAfter: 0,
      remark: "",
      type: '1',
    },
    onSubmit: (values) => {
      formik.setSubmitting(true)
      let objPayload = {
        productId: values.productId,
        amountNumber: (values.type === '1')? values.amountNumber:values.amountNumber * -1,
        remark: values.remark,
      };
      //Edit
      stockAxios
        .createStock(objPayload)
        .then((res) => {
          if (res.data.isSuccess) {
            swal.swalSuccess("Success", `Successfully.`).then(() => {
              debugger;
              props.history.push(URL_AFTERSUBMIT);
            });
          } else {
            swal.swalError("Error", res.data.message);
          }
        })
        .catch((err) => {
          formik.setSubmitting(false);
          swal.swalError("Error", err.message);
        });
    },
  });

  React.useEffect(() => {
    loadProductGroupList();
  }, []);

  React.useEffect(() => {
    loadProductList();
  }, [formik.values.productGroupId]);

  React.useEffect(() => {
    calculate()
  }, [formik.values.amountBefore])

  React.useEffect(() => {
    getProductStock()
  },[formik.values.productId])

  React.useEffect(() => {
    console.log("Calculate!");
    calculate()
  }, [ formik.values.type, formik.values.amountNumber]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid style={{ marginBottom: 10 }} container>
          <Typography variant="h6">Create Stock Edit</Typography>
        </Grid>
        {/* ProductGroup */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="productGroupId"
            label="ProductGroup"
            data={productGroupList}
            firstItemText="Select Product Group"
            selectedCallback={() => {
              formik.setFieldValue("productId", 0);
            }}
          />
        </Grid>

        {/* Product */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="productId"
            label="Product"
            data={productList}
            firstItemText="Select Product"
          />
        </Grid>

        {/* Type */}
        <Grid item xs={12} lg={3}>
          <FormikRadioGroup
            formik={formik}
            name="type"
            label="Type"
            data={actionType}
          />
        </Grid>

        {/* Start amount Before */}
        <Grid item xs={12} lg={3}>
          <FormikTextFieldNumber
            formik={formik}
            name="amountBefore"
            label="Amount Before"
            disabled
          />
        </Grid>

        {/* Start amount Number */}
        <Grid item xs={12} lg={3}>
          <FormikTextFieldNumber
            formik={formik}
            name="amountNumber"
            label="Amount Number"
          />
        </Grid>

        {/* Start amount After */}
        <Grid item xs={12} lg={3}>
          <FormikTextFieldNumber
            formik={formik}
            name="amountAfter"
            label="Amount After"
            disabled
          />
        </Grid>

        {/* Start Remark */}
        <Grid item xs={12} lg={6}>
          <FormikTextField formik={formik} name="remark" label="Remark" />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            fullWidth
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
    </form>
  );
}
export default EditStockAddV2;
