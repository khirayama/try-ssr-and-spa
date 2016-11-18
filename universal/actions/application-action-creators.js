import {dispatch} from 'universal/dispatcher';
import types from 'universal/action-types';

function initializeApplication() {
  return new Promise((resolve, reject) => {
    console.log('fetch application resource');
    resolve();
  });
}

function updateTitle(title) {
  return new Promise((resolve, reject) => {
    dispatch({
      type: types.UPDATE_TITLE,
      title,
    });
    resolve();
  });
}

function initializePage(pathname) {
  switch (pathname) {
    case '/':
      updateTitle('Top');
      break;
    case '/dashboard':
      updateTitle('Dashboard');
      break;
    default:
      updateTitle('Not Found');
      break;
  }
}

export function startApplication(pathname) {
  initializeApplication();
  initializePage(pathname);
  dispatch({
    type: types.START_APP,
    pathname,
  });
}

export function changeLocation(pathname) {
  initializePage(pathname);
  dispatch({
    type: types.CHANGE_LOCATION,
    pathname,
  });
};

