/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import CartItem from "./CartItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CartItemFooter from "./CartItemFooter";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function CartItemList(props) {
  const orderReducer = useSelector(({ order }) => order);
  const history = useHistory();
  return (
    <Paper style={{ width: "100%", marginLeft: 10 }}>
      <List component="nav" aria-label="Mailbox folders">
        {/* Begin Title */}
        <ListItem divider>
          <ListItemText primary={"Cart items"} />
        </ListItem>
        {/* End Title */}
        {orderReducer.cartItems.map((item) => (
          <div key={item.id}>
            <CartItem
              productId={item.id}
              productName={item.name}
              showDelete={props.showDelete}
              price={item.price}
              quantity={item.quantity}
            ></CartItem>
            <Divider />
          </div>
        ))}

        <CartItemFooter></CartItemFooter>
        {props.showCheckout && (
          <Grid container>
            <Button color="primary" fullWidth onClick={() => {
              history.push('/checkout')
            }}>
              Check out
            </Button>
          </Grid>
        )}
      </List>
    </Paper>
  );
}

CartItemList.propTypes = {
  showDelete: PropTypes.bool,
  showCheckout: PropTypes.bool,
};

CartItemList.defaultProps = {
  showDelete: true,
  showCheckout: true,
};

export default CartItemList;
