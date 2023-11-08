import axios from 'axios';
import { config } from '../config';
import { userService } from './userService';
import { flashCardService } from './flashCardService';

const client = axios.create(config.api);

client.defaults.headers.common['Content-Type'] = 'application/json';

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

const authService = {
  getAuth(params) {
    return client.request({
      method: 'get',
      url: '/',
      params,
    });
  },
};

export { client, userService, authService, flashCardService };
