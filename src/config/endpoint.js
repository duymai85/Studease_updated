const RESOURCES = {
  auth: 'auth',
  user: 'users',
  class: 'classes',
  set: 'sets',
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`,
    register: `${RESOURCES.auth}/register`,
    logout: `${RESOURCES.auth}/logout`,
  },
  user: {
    index: `${RESOURCES.user}`,
  },
  class: {
    index: `${RESOURCES.class}`,
    byUser: `${RESOURCES.class}/_by-users`,
  },
  set: {
    index: `${RESOURCES.set}`,
    byUser: `${RESOURCES.set}/_by-users`,
  },
};
