const RESOURCES = {
  auth: 'auth',
  user: 'user',
  class: 'class',
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
};
