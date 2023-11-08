import { environment } from './enviroment';
import { ENDPOINT } from './endpoint';

const config = {
  api: {
    baseURL: environment.apiBaseUrl,
    timeout: 25000,
  },
};

export { config, environment, ENDPOINT };
