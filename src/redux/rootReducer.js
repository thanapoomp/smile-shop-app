import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as demo from '../app/modules/_Demo/_redux/demoRedux';
import * as order from '../app/modules/Order/_redux/orderRedux';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  demo: demo.reducer,
  order: order.reducer
});

