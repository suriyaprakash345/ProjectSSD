importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// firebase.initializeApp({}, 'testNt')
firebase.initializeApp({
    apiKey: "AIzaSyDaOcjYVkfEjjZifj-4dhQqCv4RCxpyhFQ",
    authDomain: "testnt-e799d.firebaseapp.com",
    projectId: "testnt-e799d",
    storageBucket: "testnt-e799d.appspot.com",
    messagingSenderId: "81511952466",
    appId: "1:81511952466:web:add18fb6a8edbda7626f8b",
    vapidKey:"BOw8SavQiHQ3e77mFYS2-Q-ieETYvHVpOO-Cc0-DbKf839FNJyFBoPIWRzONy8CZNBaAl71Yn0O-bkcx3RM2RBc"

})

const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });