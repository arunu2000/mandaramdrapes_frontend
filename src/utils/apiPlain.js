import axios from "axios";
import { domainUrl } from "./constant";

const apiPlain = axios.create({
  baseURL: domainUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default apiPlain;
