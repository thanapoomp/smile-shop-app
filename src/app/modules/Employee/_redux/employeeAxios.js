// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
// import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const EMPLOYEE_URL = `${CONST.API_URL}/Employees`;


export const createEmployee = (name,occupation,file) => {
    let fd = new FormData();
    fd.append('name',name);
    fd.append('occupation',occupation)
    fd.append('formFile',file)
    return axios.post(EMPLOYEE_URL,fd)
}

