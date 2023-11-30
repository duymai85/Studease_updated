import { KEY_LS } from './constant';

/**
 * Returns boolean if user login
 *
 * @return {boolean} user login.
 */
export const checkUserLogin = () => {
  const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
  if (accessToken) {
    return true;
  }
  return false;
};

/**
 * Returns object parse jwt of access token.
 *
 * @param {string} token The access token.
 * @return {object} json parse jwt.
 */
export function parseJwt(token) {
  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
  return {};
}
