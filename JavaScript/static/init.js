'use strict';

console.log('JavaScript has loaded');

const registerServiceWorker = () => {
  if (!Reflect.has(navigator, 'serviceWorker')) {
    console.log('Service workers are not supported');
    return;
  }
  const { serviceWorker } = navigator;
  serviceWorker.register('/worker.js').then(registration => {
    if (registration.installing) {
      console.log('Service worker installing');
      console.log(registration.installing);
      return;
    }
    if (registration.waiting) {
      console.log('Service worker installed');
      console.log(registration.waiting);
      return;
    }
    if (registration.active) {
      console.log('Service worker active');
      console.log(registration.active);
      return;
    }
  }).catch(error => {
    console.log('Registration failed');
    console.log(error);
  });
};

window.addEventListener('load', () => {
  console.log('The page has loaded');
  registerServiceWorker();
});
