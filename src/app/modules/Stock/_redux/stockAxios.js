// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const STOCK_URL = `${CONST.API_URL}/StockEditLogs`;

export const createStock = (payload) => {
    return axios.post(STOCK_URL,payload)
}

export const getStockFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  productGroupId,
  productId
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
  };

  if (productGroupId) {
      payload.productGroupId = productGroupId
  }

  if (productId) {
      payload.productId = productId
  }

  return axios.get(encodeURLWithParams(`${STOCK_URL}/Filter`, payload));
};
