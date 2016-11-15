import {EventEmitter} from 'events'

import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import Container from './views/container';

// dispatcher
const ACTION_DISPATCH = '__ACTION_DISPATCH';

const dispatcher = new EventEmitter();

function dispatch(action) {
  dispatcher.emit(ACTION_DISPATCH, action);
}

function subscribe(callback) {
  dispatcher.addListener(ACTION_DISPATCH, callback);
}

// store
class Store extends EventEmitter {
  constructor() {
    super();

    this.state = {
      load: false,
      pathname: '',
    };
    this._subscribe();
  }
  _subscribe() {
    subscribe(action => {
      switch (action.type) {
        case 'START_APP':
          this.state.load = true;
          this.state.pathname = action.pathname;
          this.emit('load', action.res);
          break;
      }
    });
  }
  onLoad(callback) {
    this.on('load', callback);
  }
  getState() {
    return Object.assign({} , state);
  }
}

const app = express();

function layout(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>SSR + SPA</title>
      </head>
      <body>${content}</body>
    </html>
  `;
}

app.get('/', (req, res) => {
  const store = new Store();
  store.onLoad(() => {
    const content = renderToString(<Container store={store} />);

    res.send(layout(content));
  });

  dispatch({
    type: 'START_APP',
    pathname: req.path,
  });
});

app.get('/dashboard', (req, res) => {
  const store = new Store();
  store.onLoad(() => {
    const content = renderToString(<Container store={store} />);

    res.send(layout(content));
  });

  dispatch({
    type: 'START_APP',
    pathname: req.path,
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
