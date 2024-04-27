/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const login = (data) => {
  try {
    const res = httpRequest.post("user/login", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const Register = (data) => {
  try {
    const res = httpRequest.post("user/register", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await httpRequest.get("user/current-user", {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};