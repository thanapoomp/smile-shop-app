/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import * as swal from "../../Common/components/SweetAlert";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import * as orderRedux from "../_redux/orderRedux";

function CartItem(props) {
  const orderReducer = useSelector(({ order }) => order);
  const dispatch = useDispatch();
  const removeFromCart = () => {
    let itemsToUpdate = [...orderReducer.cartItems].filter(function(obj) {
      return obj.id !== props.productId;
    });
    dispatch(orderRedux.actions.updateCart(itemsToUpdate));
  };

  return (
    <ListItem divider>
      <Grid container>
        <Grid item xs={2} lg={2}>
          <ListItemText primary={props.quantity} />
        </Grid>
        <Grid item xs={7} lg={7}>
          <ListItemText primary={props.productName} />
        </Grid>
        <Grid container item xs={2} lg={2} alignContent="center" alignItems="center" justify="flex-end">
              <NumberFormat
                value={props.price}
                displayType={"text"}
                thousandSeparator={true}
              />
        </Grid>
        <Grid item xs={1} lg={1}>
          {props.showDelete && (
            <IconButton
              size={"small"}
              onClick={() => {
                swal
                  .swalConfirm("Confirm", `Confirm delete ${props.productName}?`)
                  .then((res) => {
                    if (res.isConfirmed) {
                      removeFromCart();
                    }
                  });
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
