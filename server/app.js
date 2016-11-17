import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {dispatch, removeAllListeners} from 'universal/dispatcher';
import Store from 'universal/store';
import types from 'universal/action-types';

import Container from 'universal/views/container';

const app = express();

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${state._title}</title>
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <section id="app">${content}</section>
      </body>
      <script>var state = ${JSON.stringify(state)}</script>
    </html>
  `;
}

app.use(express.static('public'));

app.get('*', (req, res) => {
  removeAllListeners();

  const store = new Store();

  store.ready(() => {
    const content = renderToString(<Container store={store} />);
    res.send(layout(content, store.getState()));
  });

  dispatch({type: types.START_APP, pathname: req.path});
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
