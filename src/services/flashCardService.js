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
      url: `${ENDPOINT.class.index}/${id}`,
    });
  },
  getClassByUserId(userId) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.byUser}/${userId}`,
    });
  },
  getAllClassByName(name) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.class.index}?search=${name}`,
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
      url: `${ENDPOINT.set.byUser}/${userId}`,
    });
  },
  getAllSetByName(name) {
    return client.request({
      method: 'get',
      url: `${ENDPOINT.set.index}?search=${name}`,
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
