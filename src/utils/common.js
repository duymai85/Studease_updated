import { KEY_LS } from './constant';

export const handleSaveDataProgress = (setId, value) => {
  const userInfo = JSON.parse(localStorage.getItem(KEY_LS.USER_INFO));
  let listProgress =
    JSON.parse(localStorage.getItem(KEY_LS.LIST_PROGRESS)) || {};

  if (userInfo && setId) {
    console.log('chaay chua', setId, value, userInfo);
    const userId = userInfo.id;

    if (!listProgress[userId]) {
      listProgress[userId] = {};
    }
    listProgress[userId][setId] = value;

    localStorage.setItem(KEY_LS.LIST_PROGRESS, JSON.stringify(listProgress));
  }
};

export const handlePushTextToNotification = (text) => {
  const listNotification =
    JSON.parse(localStorage.getItem(KEY_LS.LIST_NOTIFICATION)) || [];
  listNotification.push(text);
  localStorage.setItem(
    KEY_LS.LIST_NOTIFICATION,
    JSON.stringify(listNotification)
  );
};
