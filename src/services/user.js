import axios from "axios";
import { baseUrl } from "./config";

export const loginUserApi = async (userdata) => {
  try {
    let data = await axios.post(`${baseUrl}/user/login`, userdata);
    return data?.data;
  } catch (error) {
    return error?.response?.data;
  }
};