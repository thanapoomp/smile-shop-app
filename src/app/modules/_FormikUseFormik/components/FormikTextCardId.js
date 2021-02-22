/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input'
import MaskedInput from 'react-text-mask';
import FormHelperText from '@material-ui/core/FormHelperText'

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/,'-',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,'-',/[0-9]/,/[0-9]/,'-',/[0-9]/]}
        placeholderChar={'\u2000'}
        keepCharPositions
        guide
        showMask
      />
    );
  }

function FormikTextCardId(props) {
  // formik need these properties to connect with material ui
  // onBlur
  // onChange
  // value
  // error
  // helperText
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={`${props.name}_label`}>{props.label}</InputLabel>
      <Input
        fullWidth
        value={props.formik.values[`${props.name}`]}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        error={
          props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`]
        }
        name={props.name}
        id={`${props.name}_label`}
        inputComponent={TextMaskCustom}
        disabled={props.disabled}
      />
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] && (
          <FormHelperText>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </FormControl>
  );
}

FormikTextCardId.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

// Same approach for defaultProps too
FormikTextCardId.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false
};

export default FormikTextCardId;
