import { client } from '.';
import { ENDPOINT } from '../config';

export const flashCardService = {
  getAllClass() {
    return client.request({
      method: 'get',
      url: ENDPOINT.class.index,
    });
  },
  getClassById(id) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.index}?id=${id}`,
    });
  },
  createClass(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.class.index}`,
      data,
    });
  },
  checkExistClass(className) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.index}?className=${className}`,
    });
  },
};
