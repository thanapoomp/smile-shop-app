import React, { Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import PrivateRoute from "./modules/Auth/components/PrivateRoute";
import ErrorUnAuthorized from "./modules/Auth/pages/ErrorUnAuthorized";
import DashboardPage from "./pages/DashboardPage";
import TokenHandler from "./modules/Auth/components/TokenHandler";
import { ROLES } from "../Constants";

import ProductGroupList from "./modules/ProductGroup/pages/ProductGroupList";
import ProductGroupAddEdit from './modules/ProductGroup/pages/ProductGroupAddEdit'

export default function BasePage(props) {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute exact path="/dashboard" component={DashboardPage} />

        {/* Start Demo part สามารถ comment ได้ */}
        {/* <ContentRoute exact path="/alert" component={Alert} />
        <ContentRoute exact path="/reduxDemo" component={ReduxDemo} />
        <ContentRoute exact path="/withTextField" component={WithTextField} />
        <ContentRoute exact path="/withCheckboxAndRadio" component={WithCheckboxAndRadio} />
        <ContentRoute exact path="/withDropdown" component={WithDropdown} />
        <ContentRoute exact path="/withDatePicker" component={WithDatePicker} />
        <ContentRoute exact path="/employee/" component={EmployeeList} />
        <ContentRoute exact path="/employee/new" component={NewEmployee} />
        <ContentRoute exact path="/employee/edit/:id" component={NewEmployee} />
        <PrivateRoute exact path="/test" roles={[ROLES.admin,ROLES.developer]} component={Test} /> */}
        {/* End Demo part สามารถ comment ได้ */}

        <ContentRoute exact path="/productGroups" component={ProductGroupList} />
        <ContentRoute exact path="/productGroups/new" component={ProductGroupAddEdit} />
        <ContentRoute exact path="/productGroups/edit/:id" component={ProductGroupAddEdit} />


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
