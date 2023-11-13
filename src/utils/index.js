import { KEY_LS } from './constant';

export const checkUserLogin = () => {
  const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
  if (userInfo) {
    return true;
  }
  return false;
};
