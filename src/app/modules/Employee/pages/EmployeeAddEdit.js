/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button, Typography } from "@material-ui/core/";
import FormikTextField from "../../_FormikUseFormik/components/FormikTextField";
import * as employeeAxios from '../_redux/employeeAxios'
import { DropzoneArea } from 'material-ui-dropzone';
function EmployeeAddEdit(props) {
//   const URL_AFTERSUBMIT = "/employee";

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      name: '',
      occupation: '',
      formFile: {},
    },
    onSubmit: (values) => {
      formik.setSubmitting(true)
      //todo
      let payload = {
          name: values.name,
          occupation: values.occupation,
          formFile: values.formFile
      }
      alert(JSON.stringify(payload))
      employeeAxios.createEmployee(values.name,values.occupation,values.formFile)
      .then((res) => {
        if (res.data.isSuccess) {
            alert(JSON.stringify(res.data.data))
        } else {
            alert(res.data.message)
        }
      }).catch((err) => {
          alert(err.message)
      })
      formik.setSubmitting(false)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid style={{ marginBottom: 10 }} container>
          <Typography variant="h6">New Employee</Typography>
        </Grid>

        {/* Name */}
        <Grid item xs={12} lg={3}>
          <FormikTextField formik={formik} name="name" label="Name" />
        </Grid>

        {/* Name */}
        <Grid item xs={12} lg={3}>
          <FormikTextField
            formik={formik}
            name="occupation"
            label="Occupation"
          />
        </Grid>

        {/* Image */}
        <Grid item xs={12} lg={3}>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            filesLimit={1}
            maxFileSize={5000000}
            showPreviewsInDropzone
            dropzoneText={"Upload รูปพนักงาน (Click หรือ ลากไฟล์มาวางที่นี่)"}
            onChange={(files) => {
              formik.setFieldValue("formFile", files[0]);
            }}
            onDelete={() => {
                formik.setFieldValue('formFile',null)
            }}
          />
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
export default EmployeeAddEdit;
