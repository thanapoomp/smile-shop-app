/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import {  Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Icon from '@material-ui/core/Icon'
import { Select } from "formik-material-ui";
import Axios from "axios";
import * as CONST from '../../../../Constants'

function ProductGroupDropdown(props) {

  const productGroup_api_url = `${CONST.API_URL}/ProductGroups/Active`

  const [productGroups, setProductGroups] = React.useState([])

  React.useEffect(() => {
    Axios.get(productGroup_api_url)
    .then((res) => {
      //bind data
      if (res.data.isSuccess) {
        setProductGroups(res.data.data)
      }else{
        //internal error
        alert(res.data.message)
      }
    }).catch((err) => {
      //physical error
      alert(err.message)
    })
  }, [])

  return (
    <FormControl
      fullWidth
      error={
        props.errors[`${props.name}_isError`] && props.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor="productGroupId-simple">{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        inputProps={{
          id: "productGroupId-simple",
        }}
      >
        <MenuItem disabled={props.disableFirstItem} value={0}>
          {props.firstItemLabel}
        </MenuItem>
        {productGroups.map((item) => (
          <MenuItem key={`${props.name}_${item.id}`} value={item.id}>
            <Icon>{item.iconName}</Icon>
            {item.name}
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

ProductGroupDropdown.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disableFirstItem: PropTypes.bool,
  firstItemLabel: PropTypes.string
};

// Same approach for defaultProps too
ProductGroupDropdown.defaultProps = {
  touched: {},
  values: {},
  errors: {},
  name: '',
  label: '',
  disableFirstItem: true,
  firstItemLabel: 'กรุณาเลือก'
};

export default ProductGroupDropdown;
