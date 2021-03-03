/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import * as swal from '../../Common/components/SweetAlert'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'

function CartItem(props) {
  return (
    <ListItem divider>
      <Grid container>
        <Grid item xs={1} lg={1}>
          <ListItemText primary={props.quantity} />
        </Grid>
        <Grid item xs={8} lg={8}>
          <ListItemText primary={props.productName} />
        </Grid>
        <Grid item xs={2} lg={2}>
          <ListItemText primary={props.price} />
        </Grid>
        <Grid item xs={1} lg={1}>
          {props.showDelete && (
            <IconButton
              size={"small"}
              onClick={() => {
                swal.swalConfirm('Confirm',`Confirm delete ${props.productId}?`).then((res) => {
                  if (res.isConfirmed) {
                    alert('TODO: Delete')
                  }
                })
              }}
            >
              <Icon>close</Icon>
            </IconButton>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}

CartItem.propTypes = {
  showDelete: PropTypes.bool,
  productId: PropTypes.number,
  productName: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
};

CartItem.defaultProps = {
  showDelete: true,
  productId: 1,
};

export default CartItem;
