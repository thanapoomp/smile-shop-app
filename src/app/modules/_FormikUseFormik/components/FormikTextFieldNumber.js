/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
    const { inputRef, onChange, currencySymbol, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
  }
  
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

function FormikTextFieldNumber(props) {
  // formik need these properties to connect with material ui
  // onBlur
  // onChange
  // value
  // error
  // helperText

  return (
    <TextField
      name={props.name}
      label={props.label}
      fullWidth
      onBlur={props.formik.handleBlur}
      onChange={props.formik.handleChange}
      value={props.formik.values[`${props.name}`]}
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
      helperText={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] &&
        props.formik.errors[`${props.name}`]
      }
      disabled={props.disabled}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}

FormikTextFieldNumber.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

// Same approach for defaultProps too
FormikTextFieldNumber.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
};

export default FormikTextFieldNumber;
