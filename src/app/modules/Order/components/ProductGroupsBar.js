/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Icon from "@material-ui/core/Icon";
import * as productGroupAxios from "../../ProductGroup/_redux/productGroupAxios";
import * as swal from "../../Common/components/SweetAlert";
import { useDispatch, useSelector } from "react-redux";
import * as orderRedux from "../_redux/orderRedux";

function ProductGroupsBar() {
  const [productGroupList, setProductGroupList] = React.useState([]);

  const dispatch = useDispatch();

  const orderReducer = useSelector(({ order }) => order);

  const handleChange = (event, newValue) => {
    dispatch(orderRedux.actions.selectProductGroup(newValue));
  };

  const loadProductGroupList = () => {
    productGroupAxios
      .getActiveProductGroups()
      .then((res) => {
        if (res.data.isSuccess) {
          setProductGroupList(res.data.data);
        } else {
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      });
  };

  React.useEffect(() => {
    loadProductGroupList();
  }, []);

  React.useEffect(() => {
    // Select first productgroup
    if (productGroupList.length > 0) {
      dispatch(orderRedux.actions.selectProductGroup(productGroupList[0].id));
    }
  }, [productGroupList]);

  return (
    <AppBar position="static" color="default">
        <Tabs
          value={orderReducer.selectedProductGroupId}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {(productGroupList.length === 0) && (
            <Tab
              value={0}
              key={0}
              label=""
            />
          )}
          {productGroupList.map((item) => (
            <Tab
              value={item.id}
              key={item.id}
              label={item.name}
              icon={<Icon>{item.iconName}</Icon>}
            />
          ))}
        </Tabs>
    </AppBar>
  );
}
export default ProductGroupsBar;
