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
import Icon from "@material-ui/core/Icon";
import { useParams } from "react-router-dom";
import * as productGroupAxios from "../_redux/productGroupAxios";
import { swalError, swalSuccess } from "../../Common/components/SweetAlert";
import axios from "axios";

function ProductGroupAddEdit(props) {
  let { id } = useParams();

  const [state, setState] = React.useState({
    id: 0,
    name: "",
  });

  React.useEffect(() => {
    //Load by Id
    if (id) {
      productGroupAxios
        .getProductGroup(id)
        .then((res) => {
          if (res.data.isSuccess) {
            setState({
              ...state,
              name: res.data.data.name,
              id: res.data.data.id,
            });
          } else {
            swalError("Error", res.data.message);
          }
        })
        .catch((err) => {
          swalError("Error", err.message);
        });
    }
  }, [id]);

  return (
    <Formik
      //Form fields and default values
      enableReinitialize
      initialValues={{
        name: state.name,
      }}
      //Validation section
      validate={(values) => {
        const errors = {};

        if (!values.name) {
          errors.name = "Required";
        }

        return errors;
      }}
      //Form Submission
      // ต้องผ่าน Validate ก่อน ถึงจะถูกเรียก
      onSubmit={(values, { setSubmitting }) => {
        let objPayload = { ...state, name: values.name };
        if (state.id) {
          //Edit
          productGroupAxios
            .updateProductGroup(objPayload, state.id)
            .then((res) => {
              if (res.data.isSuccess) {
                swalSuccess(
                  "Success",
                  `Update  ${state.name}  =>  ${objPayload.name} Successfully.`
                ).then(() => {
                  setSubmitting(false);
                  props.history.push("/productGroups");
                });
              } else {
                swalError("Error", res.data.message);
              }
            })
            .catch((err) => {
              swalError("Error", err.message);
            });
        } else {
          //Add
          productGroupAxios
            .createProductGroup(objPayload)
            .then((res) => {
              if (res.data.isSuccess) {
                swalSuccess(" Success", `${objPayload.name} Created.`).then(
                  () => {
                    setSubmitting(false);
                    props.history.push("/productGroups");
                  }
                );
              } else {
                swalError("Error", res.data.message);
              }
            })
            .catch((err) => {
              swalError("Error", err.message);
            });
        }
      }}
    >
      {/* Render form */}
      {({ submitForm, isSubmitting, values, errors }) => (
        <div>
          <Paper style={{ padding: 20 }} elevation={3}>
            <Form>
              <Grid style={{ marginBottom: 10 }} container>
                {id ? (
                  <Typography variant="h6">
                    Edit Product Group ({state.name})
                  </Typography>
                ) : (
                  <Typography variant="h6">New Product Group</Typography>
                )}
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Field
                    fullWidth
                    component={TextField}
                    required
                    type="text"
                    label="Name"
                    name="name"
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
                    {isSubmitting && <LinearProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      disabled={isSubmitting}
                      onClick={() => {
                        props.history.push("/productGroups");
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
        </div>
      )}
    </Formik>
  );
}

export default ProductGroupAddEdit;
