import React from 'react';
import ReactDOM from 'react-dom';

import Store from 'universal/store';

import Container from 'universal/views/container';

window.addEventListener('popstate', () => {
  changeHistory(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  const store = new Store();
  store.initialize(state);

  const app = document.querySelector('#app');
  app.innerHTML = '';

  ReactDOM.render(<Container store={store}/>, app);
});
