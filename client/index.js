import React from 'react';
import ReactDOM from 'react-dom';

import Store from 'universal/store';

import Container from 'universal/views/container';

window.addEventListener('popstate', () => {
  changeLocation(location.pathname, false);
});

window.addEventListener('DOMContentLoaded', () => {
  const store = new Store(state);

  ReactDOM.render(<Container store={store}/>, document.querySelector('#app'));
});
