
import axios, {
  AxiosInstance,
} from "axios";
import 'dotenv/config';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  withCredentials: true,
});

export default instance;