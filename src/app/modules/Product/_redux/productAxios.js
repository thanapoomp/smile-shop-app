// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}/Products`;

export const getProduct = (id) => {
    return axios.get(`${PRODUCT_URL}/${id}`)
};

export const getProductByProductGroupId = (productGroupId) => {
    return axios.get(`${PRODUCT_URL}/ByProductGroupId/${productGroupId}`)
}

export const createProduct = (payload) => {
    return axios.post(PRODUCT_URL,payload)
}

export const updateProduct = (payload, id) => {
    return axios.put(`${PRODUCT_URL}/${id}`,payload)
}

export const deleteProduct = (id) => {
    return axios.delete(`${PRODUCT_URL}/${id}`)
}

export const getProductFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  name,
  isShowInActive,
  productGroupId
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    name,
  };
  if (isShowInActive) {
    payload.isShowInActive = isShowInActive
  }

  if (productGroupId) {
    payload.productGroupId = productGroupId
  }

  return axios.get(encodeURLWithParams(`${PRODUCT_URL}/Filter`, payload));
};
