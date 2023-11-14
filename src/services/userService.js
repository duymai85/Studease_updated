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
      url: `${ENDPOINT.user.index}/${id}`,
    });
  },
  getAllUserByUsername(username) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.user.index}?username_like=${username}`,
    });
  },
  login(data) {
    const { username, password } = data;
    return client.request({
      method: 'get',
      url: `${ENDPOINT.user.index}?username=${username}&password=${password}`,
    });
  },
  register(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.user.index}`,
      data,
    });
  },
  checkExistUser(username) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.user.index}?username=${username}`,
    });
  },
  updateUser(data) {
    return client.request({
      method: 'put',
      url: `${ENDPOINT.user.index}/${data.id}`,
      data,
    });
  },
};
