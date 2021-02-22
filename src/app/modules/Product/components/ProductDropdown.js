/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import * as React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as swal from '../../Common/components/SweetAlert'
import * as productGroupAxios from '../../ProductGroup/_redux/productGroupAxios'
import * as productAxios from '../../Product/_redux/productAxios'

function ProductDropdown(props) {
  const [productGroupList, setProductGroupList] = React.useState([])
  const [productList, setproductList] = React.useState([]);

  React.useEffect(() => {
    //Load ProductGroups
    productGroupAxios
      .getActiveProductGroups()
      .then((res) => {
        if (res.data.isSuccess) {
          setProductGroupList(res.data.data);
        } else {
          swal.swalError("error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("error", err.message);
      });
  }, []);

  React.useEffect(() => {
    //Load Product
    let productGroupId = props.values[`${props.name}_productGroupId`];
    if (productGroupId) {
      productAxios
        .getProductByProductGroupId(productGroupId)
        .then((res) => {
          if (res.data.isSuccess) {
            setproductList(res.data.data);
          } else {
            swal.swalError("error", res.data.message);
          }
        })
        .catch((err) => {
          swal.swalError("error", err.message);
        });
    }
  }, [props.values[`${props.name}_productGroupId`]]);


  return (
    <>
      {/* Start ProductGroup */}
      <Grid item xs={12} lg={props.gridLgNumber}>
        <FormControl
          fullWidth
          error={
            props.errors[`${props.name}_ProductGroupId_isError`] &&
            props.touched[`${props.name}_productGroupId`]
          }
        >
          <InputLabel htmlFor="productGroup">Product Group</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_productGroupId`}
            inputProps={{
              id: "productGroupId",
            }}
            onChange={(event) => {
              props
                .setFieldValue(event.target.name, event.target.value)
                .then(() => {
                  // reset selected product
                  props
                    .setFieldValue(`${props.name}_productId`, 0)
                });
            }}
          >
            <MenuItem disabled={props.disableFirstItem} value={0}>
              {props.firstItemLabel}
            </MenuItem>
            {productGroupList.map((item) => (
              <MenuItem
                key={`${props.name}_p_${item.id}`}
                value={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Field>
          {props.errors[`${props.name}_productGroupId_isError`] &&
            props.touched[`${props.name}_productGroupId`] && (
              <FormHelperText>
                {props.errors[`${props.name}_productGroupId_errorText`]}
              </FormHelperText>
            )}
        </FormControl>
      </Grid>
      {/* End ProductGroup */}

      {/* Start product */}
      <Grid item xs={12} lg={props.gridLgNumber}>
        <FormControl
          fullWidth
          error={
            props.errors[`${props.name}_productId_isError`] &&
            props.touched[`${props.name}_productId`]
          }
        >
          <InputLabel htmlFor="product">Product</InputLabel>
          <Field
            component={Select}
            name={`${props.name}_productId`}
            inputProps={{
              id: "productId",
            }}
            onChange={(event) => {
              props
                .setFieldValue(event.target.name, event.target.value).then(() => {
                  props.onValueChanged(event.target.value)
                })
            }}
          >
            <MenuItem disabled={props.disableFirstItem} value={0}>
            {props.firstItemLabel}
            </MenuItem>
            {productList.map((item) => (
              <MenuItem
                key={`${props.name}_d_${item.productId}`}
                value={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Field>
          {props.errors[`${props.name}_productId_isError`] &&
            props.touched[`${props.name}_productId`] && (
              <FormHelperText>
                {props.errors[`${props.name}_productId_errorText`]}
              </FormHelperText>
            )}
        </FormControl>
      </Grid>
      {/* End product */}
    </>
  );
}

ProductDropdown.propTypes = {
    touched: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
    onValueChanged: PropTypes.func,
    name: PropTypes.string,
    disableFirstItem: PropTypes.bool,
    firstItemLabel: PropTypes.string,
    gridLgNumber: PropTypes.number
  };
  
  // Same approach for defaultProps too
  ProductDropdown.defaultProps = {
    touched: {},
    values: {},
    errors: {},
    setFieldValue: ()=>{return},
    onValueChanged: ()=>{return},
    name: '',
    disableFirstItem: true,
    firstItemLabel: 'กรุณาเลือก',
    gridLgNumber: 4
  };

export default ProductDropdown;
