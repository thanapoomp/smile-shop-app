import React, { Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import PrivateRoute from "./modules/Auth/components/PrivateRoute";
import ErrorUnAuthorized from "./modules/Auth/pages/ErrorUnAuthorized";
import Test from './pages/Test'
import TokenHandler from "./modules/Auth/components/TokenHandler";
import { ROLES } from "../Constants";
import Alert from './modules/_Demo/Alert'
import WithCheckboxAndRadio from './modules/_FormikDemo/pages/WithCheckboxAndRadio'
import ReduxDemo from './modules/_Demo/pages/ReduxDemo'
import WithTextField from './modules/_FormikDemo/pages/WithTextField'
import WithDropdown from './modules/_FormikDemo/pages/WithDropdown'
import WithDatePicker from './modules/_FormikDemo/pages/WithDatePicker'
import EmployeeList from './modules/Employee/pages/EmployeeList'
import EmployeeAddEdit from './modules/Employee/pages/EmployeeAddEdit'
import ProductGroupList from "./modules/ProductGroup/pages/ProductGroupList";
import ProductGroupAddEdit from './modules/ProductGroup/pages/ProductGroupAddEdit'
import ProductList from "./modules/Product/pages/ProductList";
import ProductAddEdit from "./modules/Product/pages/ProductAddEdit";
import EditStockList from "./modules/Stock/pages/EditStockList";
import EditStockAddV2 from './modules/Stock/pages/EditStockAddV2'
import FormikContext from "./modules/_FormikDemo/pages/FormikContext";

export default function BasePage(props) {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/test" />}
        <ContentRoute exact path="/test" component={Test} />

        {/* Start Demo part สามารถ comment ได้ */}
        <ContentRoute exact path="/alert" component={Alert} />
        <ContentRoute exact path="/reduxDemo" component={ReduxDemo} />
        <ContentRoute exact path="/withTextField" component={WithTextField} />
        <ContentRoute exact path="/formikContext" component={FormikContext} />
        <ContentRoute exact path="/withCheckboxAndRadio" component={WithCheckboxAndRadio} />
        <ContentRoute exact path="/withDropdown" component={WithDropdown} />
        <ContentRoute exact path="/withDatePicker" component={WithDatePicker} />
        <ContentRoute exact path="/employee/" component={EmployeeList} />
        <ContentRoute exact path="/employee/new" component={EmployeeAddEdit}/>
        <PrivateRoute exact path="/test" roles={[ROLES.admin,ROLES.developer]} component={Test} />
        {/* End Demo part สามารถ comment ได้ */}

        <ContentRoute exact path="/productGroups" component={ProductGroupList} />
        <ContentRoute exact path="/productGroups/new" component={ProductGroupAddEdit} />
        <ContentRoute exact path="/productGroups/edit/:id" component={ProductGroupAddEdit} />

        <ContentRoute exact path="/products" component={ProductList} />
        <ContentRoute exact path="/products/new" component={ProductAddEdit} />
        <ContentRoute exact path="/products/edit/:id" component={ProductAddEdit} />

        <ContentRoute exact path="/stock/" component={EditStockList} />
        <ContentRoute exact path="/stock/add" component={EditStockAddV2} />

        <Route
          path="/errorUnAuthorized"
          component={ErrorUnAuthorized}
        />

        {/* nothing match - redirect to error */}
        <Redirect to="/error"/>
      </Switch>
      <TokenHandler></TokenHandler>
    </Suspense>
  );
}
