import { client } from '.';
import { ENDPOINT } from '../config';

export const authService = {
  login(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.auth.index}/login`,
      data,
    });
  },
  register(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.auth.index}/register`,
      data,
    });
  },
  logout() {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.auth.index}/logout`,
    });
  },
};
