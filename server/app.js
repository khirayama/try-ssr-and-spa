import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {dispatch, removeAllListeners} from 'universal/dispatcher';
import Store from 'universal/store';

import Container from 'universal/views/container';

const app = express();

function layout(content, state) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>SSR + SPA</title>
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <section id="app">${content}</section>
      </body>
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

app.use(express.static('public'));
app.listen(3000, () => {
  console.log('listening on port 3000');
});
