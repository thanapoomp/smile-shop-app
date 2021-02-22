/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import ProductDropdown from '../../Product/components/ProductDropdown'

function StockTableSearch(props) {
  const productDropdownName = 'product';
    return (
        <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search Stock Edit Log
        </Typography>

        <Formik
          //Form fields and default values
          initialValues={{
            product_productGroupId: 0,
            product_productId: 0
          }}
          //Validation section
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          //Form Submission
          // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            props.submit({
              productGroupId: values[`${productDropdownName}_productGroupId`],
              productId: values[`${productDropdownName}_productId`]
            });
          }}
        >
          {/* Render form */}
          {({ submitForm, isSubmitting, values, errors, resetForm, touched,setFieldValue }) => (
            <Form>
              <Grid container justify="center">
                <Grid
                  container
                  item
                  xs={12}
                  lg={10}
                  justify="center"
                  spacing={3}
                >
                  <ProductDropdown
                      touched={touched}
                      values={values}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      name={productDropdownName}
                      disableFirstItem={false}
                      firstItemLabel="ทั้งหมด"
                  />

                  <Grid container item xs={12} lg={1}>
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      <Icon>search</Icon>
                    </Button>
                  </Grid>
                </Grid>
                <Grid container item xs={12} lg={2}>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      props.history.push('/stock/add')
                    }}
                  >
                    <Icon>add</Icon>
                    New Record
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
    )
}

export default StockTableSearch