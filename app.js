import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {dispatch, removeAllListeners} from './dispatcher';
import Store from './store';

import Container from './views/container';

const app = express();

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>SSR + SPA</title>
      </head>
      <body>${content}</body>
      <script>var state = ${JSON.stringify(state)}</script>
    </html>
  `;
}

app.get('/', (req, res) => {
  removeAllListeners();

  const store = new Store();

  store.ready(() => {
    const content = renderToString(<Container store={store} />);
    res.send(layout(content, store.getState()));
  });

  dispatch({type: 'START_APP', pathname: req.path});
});

app.get('/dashboard', (req, res) => {
  removeAllListeners();

  const store = new Store();

  store.ready(() => {
    const content = renderToString(<Container store={store} />);
    res.send(layout(content, store.getState()));
  });

  dispatch({type: 'START_APP', pathname: req.path});
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
