import React from 'react';
import ReactDOM from 'react-dom';

import Store from 'universal/store';

import Container from 'universal/views/container';

window.addEventListener('popstate', () => {
  changeHistory(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  const store = new Store();

  ReactDOM.render(<Container store={store}/>, document.querySelector('#app'));
});
