// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCTGROUP_URL = `${CONST.API_URL}/ProductGroups`;

export const getProductGroup = (id) => {
    return axios.get(`${PRODUCTGROUP_URL}/${id}`)
};

export const createProductGroup = (payload) => {
    return axios.post(PRODUCTGROUP_URL,payload)
}

export const updateProductGroup = (payload, id) => {
    return axios.put(`${PRODUCTGROUP_URL}/${id}`,payload)
}

export const deleteProductGroup = (id) => {
    return axios.delete(`${PRODUCTGROUP_URL}/${id}`)
}

export const getProductGroupFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  name
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    name,
  };
  return axios.get(encodeURLWithParams(`${PRODUCTGROUP_URL}/Filter`, payload));
};
