import { client } from '.';
import { ENDPOINT } from '../config';

export const userService = {
  getAllUser() {
    return client.request({
      method: 'get',
      url: ENDPOINT.user.index,
    });
  },
  getUserById(id) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.user.index}?id=${id}`,
    });
  },
  login(data) {
    const { email, password } = data;
    return client.request({
      method: 'get',
      url: `${ENDPOINT.user.index}?email=${email}&password=${password}`,
    });
  },
  register(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.user.index}`,
      data,
    });
  },
  checkExistUser(email) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.user.index}?email=${email}`,
    });
  },
};
