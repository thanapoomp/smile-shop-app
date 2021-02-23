/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
// import SVG from "react-inlinesvg";
import { checkIsActive } from "../../../../_helpers";
// import { toAbsoluteUrl } from "../../../../_helpers";
// import { useSelector } from "react-redux";
// import { ROLES } from "../../../../../Constants";
import Hoc from "../../../../../app/modules/Common/components/Hoc";
// import DvrIcon from "@material-ui/icons/Dvr";
import Icon from "@material-ui/core/Icon";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  // const authReducer = useSelector(({ auth }) => auth);

  // const isShowMenu = (roles) => {
  //   roles = roles === undefined ? [] : roles;
  //   if (roles.length > 0) {
  //     // check if route is restricted by role
  //     let intersection = roles.filter((x) => authReducer.roles.includes(x));
  //     return intersection.length > 0;
  //   } else {
  //     return true;
  //   }
  // };

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <Hoc>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">Manage Shop</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* end:: section */}

        {/*begin::1 product groups*/}
        <li
          className={`menu-item ${getMenuItemActive("/productGroups", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/productGroups">
            <span className="svg-icon menu-icon">
              <Icon>group_work</Icon>
            </span>
            <span className="menu-text">Product Groups</span>
          </NavLink>
        </li>
        {/*begin::1 end product groups*/}

        {/*begin::1 products*/}
        <li
          className={`menu-item ${getMenuItemActive("/products", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/products">
            <span className="svg-icon menu-icon">
              <Icon>cakes</Icon>
            </span>
            <span className="menu-text">Products</span>
          </NavLink>
        </li>
        {/*begin::1 end products*/}

        {/*begin::1 EditStock*/}
        <li
          className={`menu-item ${getMenuItemActive("/stock/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/stock/">
            <span className="svg-icon menu-icon">
              <Icon>inventory_2</Icon>
            </span>
            <span className="menu-text">Edit Stock</span>
          </NavLink>
        </li>
        {/*begin::1 end EditStock*/}

        {/*begin::1 Employee*/}
        <li
          className={`menu-item ${getMenuItemActive("/employee/", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/employee/">
            <span className="svg-icon menu-icon">
              <Icon>supervisor_account</Icon>
            </span>
            <span className="menu-text">Employee</span>
          </NavLink>
        </li>
        {/*end::1 end Employee*/}

      </ul>
      {/* end::Menu Nav */}
    </Hoc>
  );
}
