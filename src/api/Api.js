import axios from "axios";
import api_url from "./ApiBaseUrl";

const BASE_URL = api_url;

const headers = {};

export async function post(endpoint, body, header) {
  const response = await axios.post(`${BASE_URL}/${endpoint}`, body, {
    headers: header,
  });
  return response;
}

export async function put(endpoint, body = {}, header = headers) {
  const response = await axios.put(
    `${BASE_URL}/${endpoint}`,
    {},
    {
      headers: header,
    }
  );
  return response;
}

export async function deleteReq(endpoint, body = {}, header = headers) {
  const response = await axios.delete(`${BASE_URL}/${endpoint}`, {
    headers: header,
  });
  return response;
}

export async function get(endpoint, header = headers) {
  const response = await axios.get(`${BASE_URL}/${endpoint}`, {
    headers: header,
  });
  return response;
}
