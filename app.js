import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import App from './views/components/app';

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
  const content = renderToString(<App />);

  res.status(200).send(layout(content));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
