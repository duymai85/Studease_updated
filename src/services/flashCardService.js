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
  getClassByUserId(userId) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.index}?userId=${userId}`,
    });
  },
  getAllClassByName(name) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.index}?name_like=${name}`,
    });
  },
  createClass(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.class.index}`,
      data,
    });
  },
  deleteClass(id) {
    return client.request({
      method: 'delete',
      url: `${ENDPOINT.class.index}/${id}`,
    });
  },
  updateClass(data) {
    return client.request({
      method: 'put',
      url: `${ENDPOINT.class.index}/${data.id}`,
      data,
    });
  },
  checkExistClass(className) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.index}?name=${className}`,
    });
  },
  getAllSet() {
    return client.request({
      method: 'get',
      url: ENDPOINT.set.index,
    });
  },
  getSetById(id) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.set.index}/${id}`,
    });
  },
  getSetByUserId(userId) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.set.index}?userId=${userId}`,
    });
  },
  getAllSetByName(name) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.set.index}?name_like=${name}`,
    });
  },
  createSet(data) {
    return client.request({
      method: 'post',
      url: `${ENDPOINT.set.index}`,
      data,
    });
  },
  updateSet(data) {
    return client.request({
      method: 'put',
      url: `${ENDPOINT.set.index}/${data.id}`,
      data,
    });
  },
  deleteSet(id) {
    return client.request({
      method: 'delete',
      url: `${ENDPOINT.set.index}/${id}`,
    });
  },
};
