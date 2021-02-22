/* eslint-disable no-restricted-imports */
import * as React from "react";
import { useFormikContext, Formik, Form, Field } from "formik";
import { Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";

function FormikContext() {
  const [calculatedValue, setcalculatedValue] = React.useState('')

  const FormikValueRef = () => {
    // Grab values and submitForm from context
    const { values } = useFormikContext();
    React.useEffect(() => {
      console.log('Wow!')
      setcalculatedValue(values.firstName + ' calculated!')
    }, [values]);
    return null;
  };

  return (
    <div>
      {calculatedValue}
      <Formik
        //Form fields and default values
        initialValues={{
          firstName: "",
        }}
        //Validation section
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        //Form Submission
        // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            let objPayload = {
              ...values,
              idCard: values.idCard.replaceAll("-", ""),
            };
            alert(JSON.stringify(objPayload, null, 2));
          }, 500);
        }}
      >
        {/* Render form */}
        {({ submitForm, isSubmitting, values, errors }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  type="text"
                  label="First Name"
                  name="firstName"
                />
              </Grid>
            </Grid>
            <FormikValueRef></FormikValueRef>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikContext;
