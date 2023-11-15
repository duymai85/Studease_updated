import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCl_o-cqOZJw6eaWezKSWiZWf47nn6d-PU',
  authDomain: 'quizlet-52f87.firebaseapp.com',
  projectId: 'quizlet-52f87',
  storageBucket: 'quizlet-52f87.appspot.com',
  messagingSenderId: '869295532734',
  appId: '1:869295532734:web:10dcc71ccd68098130ccef',
  measurementId: 'G-CYJ7D9M7GD',
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      'BOuubex4AIVjUJKpB_BG62NCOMQZEUyF2p6-4iJUWDqxdPQhBE1bEJJHHv115Xw9GtTDaJpb80iXbh0e3PLfka4',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const sendMessage = (data) => {
  getMessaging()
    .send(data)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};
