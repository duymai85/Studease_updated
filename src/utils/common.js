import { KEY_LS } from './constant';
import { parseJwt } from './index';

/**
 * Returns void.
 *
 * @param {string} setId The id of set.
 * @param {string} value The value of user learned study set.
 * @return void
 */
export const handleSaveDataProgress = (setId, value) => {
  const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
  let listProgress =
    JSON.parse(localStorage.getItem(KEY_LS.LIST_PROGRESS)) || {};

  if (accessToken && setId) {
    const userId = parseJwt(accessToken).sub;

    if (!listProgress[userId]) {
      listProgress[userId] = {};
    }
    listProgress[userId][setId] = value;

    localStorage.setItem(KEY_LS.LIST_PROGRESS, JSON.stringify(listProgress));
  }
};

/**
 * Returns void.
 *
 * @param {string} text The text of notification want to push.
 * @return void
 */
export const handlePushTextToNotification = (text) => {
  const accessToken = JSON.parse(localStorage.getItem(KEY_LS.ACCESS_TOKEN));
  const listNotification =
    JSON.parse(localStorage.getItem(KEY_LS.LIST_NOTIFICATION)) || {};
  if (accessToken) {
    const userId = parseJwt(accessToken).sub;

    if (!listNotification[userId]) {
      listNotification[userId] = [];
    }
    listNotification[userId].push(text);

    localStorage.setItem(
      KEY_LS.LIST_NOTIFICATION,
      JSON.stringify(listNotification)
    );
  }
};
