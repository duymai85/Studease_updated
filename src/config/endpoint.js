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
  },
  user: {
    index: `${RESOURCES.user}`,
  },
  class: {
    index: `${RESOURCES.class}`,
  },
  set: {
    index: `${RESOURCES.set}`,
  },
};
