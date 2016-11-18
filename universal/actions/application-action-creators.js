import {dispatch} from 'universal/dispatcher';
import types from 'universal/action-types';

export function startApplication(pathname) {
  let title = '';

  switch (pathname) {
    case '/':
      title = 'Top';
      break;
    case '/dashboard':
      title = 'Dashboard';
      break;
    default:
      title = 'Not Found';
      break;
  }
  dispatch({
    type: types.START_APP,
    pathname,
    title,
  });
}

export function changeLocation(pathname) {
  let title = '';

  switch (pathname) {
    case '/':
      title = 'Top';
      break;
    case '/dashboard':
      title = 'Dashboard';
      break;
    default:
      title = 'Not Found';
      break;
  }
  dispatch({
    type: types.CHANGE_LOCATION,
    pathname,
    title,
  });
};

