import axios from 'axios';
import { config } from '../config';
import { userService } from './userService';
import { flashCardService } from './flashCardService';
import { authService } from './authService';
import { KEY_LS } from '../utils/constant';

const client = axios.create(config.api);
const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));

client.defaults.headers.common['Content-Type'] = 'application/json';
if (accessToken) {
  client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
// Request interceptor
client.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { client, userService, authService, flashCardService };
