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
      url: `${ENDPOINT.user.index}?search=${username}`,
    });
  },
  updateUser(data) {
    return client.request({
      method: 'put',
      url: `${ENDPOINT.user.index}/${data.id}`,
      data,
    });
  },
  changePassword(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.user.changePassword}`,
      data,
    });
  },
};
