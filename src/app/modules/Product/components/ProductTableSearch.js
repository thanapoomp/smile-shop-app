/* eslint-disable no-restricted-imports */
import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CheckboxWithLabel } from "formik-material-ui";
import Icon from "@material-ui/core/Icon";
import ProductGroupDropdown from '../../ProductGroup/components/ProductGroupDropdown'

function ProductTableSearch(props) {
  return (
    <Card elevation={3} style={{ marginBottom: 5 }}>
      <CardContent>
        <Typography style={{ fontSize: 14 }} gutterBottom>
          Search Product
        </Typography>

        <Formik
          //Form fields and default values
          initialValues={{
            name: "",
            productGroupId: 0,
            isShowInActive: false,
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
            props.submit(values);
          }}
        >
          {/* Render form */}
          {({
            submitForm,
            isSubmitting,
            values,
            errors,
            resetForm,
            touched,
          }) => (
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
                  <Grid item xs={12} lg={3}>
                    <Field
                      fullWidth
                      component={TextField}
                      type="text"
                      label="Name"
                      name="name"
                    />
                  </Grid>

                  <Grid item xs={12} lg={3}>
                    <ProductGroupDropdown
                      touched={touched}
                      values={values}
                      errors={errors}
                      name="productGroupId"
                      label="Product Group"
                      disableFirstItem={false}
                      firstItemLabel="ทั้งหมด"
                    />
                  </Grid>

                  <Grid
                    container
                    alignContent="flex-end"
                    justify="flex-start"
                    item
                    xs={12}
                    lg={3}
                  >
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="isShowInActive"
                      Label={{ label: "showInActive" }}
                    />
                  </Grid>

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
                      props.history.push("/products/new");
                    }}
                  >
                    <Icon>add</Icon>
                    New Product
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ProductTableSearch;
