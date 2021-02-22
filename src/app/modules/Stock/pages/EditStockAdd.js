/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import Icon from "@material-ui/core/Icon";
import * as stockAxios from "../_redux/stockAxios";
import * as productAxios from '../../Product/_redux/productAxios'
import { swalError, swalSuccess } from "../../Common/components/SweetAlert";
import ProductDropdown from "../../Product/components/ProductDropdown";

function EditStockAdd(props) {
  const URL_AFTERSUBMIT = "/stock";

  const [state, setState] = React.useState({
    amountBefore: 0,
    amountAfter: 0,
  });

  const getAmountBefore = (productId) => {
    console.log('getAmountBefore!')
    productAxios.getProduct(productId).then((res) => {

    }).catch((err) => {
      
    })
    setState({
      ...state,
      amountBefore: 10
    })
  }

  const calculate = (amountNumber) => {
    console.log('calculate!')
    setState({
      ...state,
      amountAfter: amountNumber,
    })
  }

  return (
    <Formik
      //Form fields and default values
      enableReinitialize
      initialValues={{
        product_productGroupId: 0,
        product_productId: 0,
        amountNumber: 0,
        remark: "",
        type: 1,
      }}
      //Validation section
      validate={(values) => {
        const errors = {};

        if (!values.product_productId) {
          errors.product_productId_isError = true;
          errors.product_productId_errorText = "Required";
        }

        if (!values.amountNumber) {
          errors.amountNumber = "Required";
        }

        if (!values.remark) {
          errors.remark = "Required";
        }

        return errors;
      }}
      
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        let objPayload = {
          productId: values.product_productId,
          amountNumber: values.amountNumber,
          remark: values.remark,
        };
        //Edit
        stockAxios
          .createStock(objPayload)
          .then((res) => {
            if (res.data.isSuccess) {
              swalSuccess("Success", `Successfully.`).then(() => {
                setSubmitting(false);
                props.history.push(URL_AFTERSUBMIT);
              });
            } else {
              swalError("Error", res.data.message);
            }
          })
          .catch((err) => {
            setSubmitting(false);
            swalError("Error", err.message);
          });
      }}
    >
      {/* Render form */}
      {({
        submitForm,
        isSubmitting,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <Paper style={{ padding: 20 }} elevation={3}>
          <Form>
            <Grid style={{ marginBottom: 10 }} container>
              <Typography variant="h6">Create Stock Edit</Typography>
            </Grid>
            <Grid container spacing={3}>
              <ProductDropdown
                touched={touched}
                values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                onValueChanged={(value) => {
                  getAmountBefore(value)
                }}
                name="product"
                disableFirstItem={true}
                firstItemLabel="กรุณาเลือก"
                gridLgNumber={3}
              />
              <Grid item xs={12} lg={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="type-simple">Type</InputLabel>
                  <Field
                    component={Select}
                    name="type"
                    onChange={() => {
                      calculate(values.amountNumber)
                    }}
                    inputProps={{
                      id: "type-simple",
                    }}
                  >
                    <MenuItem value={1}>Add</MenuItem>
                    <MenuItem value={2}>Remove</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  type="number"
                  label="Amount"
                  name="amountNumber"
                  onChange={(event) => {
                    setFieldValue('amountNumber', event.target.value)
                      .then(() => {
                        // calculate
                        calculate(values.product_productId,values.amountNumber)
                      });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <Typography variant="h5">
                  Amount Before : {state.amountBefore}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={3}>
                <Typography variant="h5">
                  Amount After : {state.amountAfter}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  type="text"
                  label="Remark"
                  name="remark"
                />
              </Grid>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ marginTop: 10 }}
              >
                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    disabled={isSubmitting}
                    onClick={() => {
                      props.history.push(URL_AFTERSUBMIT);
                    }}
                  >
                    <Icon>arrow_back</Icon>
                  </Button>
                </Grid>
                <Grid item xs={12} lg={3}>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <br></br>
            values :{JSON.stringify(values)}
            <br></br>
            errors :{JSON.stringify(errors)}
          </Form>
        </Paper>
      )}
    </Formik>
  );
}

export default EditStockAdd;
