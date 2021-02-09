//npm i react-text-mask react-number-format --save
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React from 'react'
import PropTypes from "prop-types";
import {  Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import Icon from "@material-ui/core/Icon";
import * as icons from './iconList'

function IconPicker(props) {  
    const [iconList, setIconList] = React.useState([])

    React.useEffect(() => {
      setIconList(icons.list)
    }, [])

    return (
      <FormControl
        fullWidth
        error={
          props.errors[`${props.name}_isError`] &&
          props.touched[`${props.name}`]
        }
      >
        <InputLabel htmlFor="icon-simple">{props.label}</InputLabel>
        <Field
          component={Select}
          name={props.name}
          inputProps={{
            id: "icon-simple",
          }}
        >
          <MenuItem disabled value={0}>
            กรุณาเลือก
          </MenuItem>
          {iconList.map((item) => (
            <MenuItem key={`${props.name}_${item}`} value={item}>
              <Icon>{item}</Icon>
               {' '} {item}
            </MenuItem>
          ))}
        </Field>
        {props.touched[`${props.name}`] && (
          <FormHelperText>
            {props.errors[`${props.name}_errorText`]}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  IconPicker.propTypes = {
    touched: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string
  };
  
  // Same approach for defaultProps too
  IconPicker.defaultProps = {
    touched: {},
    values: {},
    errors: {},
    name: '',
    label: ''
  };
  

export default IconPicker
