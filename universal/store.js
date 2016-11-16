import {EventEmitter} from 'events';

import types from 'universal/action-types';
import {subscribe} from 'universal/dispatcher';

const actionTypes = {
  CHANGE_STORE: '__CHANGE_STORE',
  READY_APP: '__READY_APP',
};

export default class Store extends EventEmitter {
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
        case types.START_APP:
          this.state.load = true;
          this.state.pathname = action.pathname;
          this.emit(actionTypes.READY_APP);
          break;
        case types.CHANGE_HISTORY:
          this.state.pathname = action.pathname;
          break;
      }

      this.dispatchChange();
    });
  }
  initialize(state) {
    this.state = state || this.state;
  }
  getState() {
    return Object.assign({}, this.state);
  }
  ready(callback) {
    this.on(actionTypes.READY_APP, callback);
  }
  dispatchChange() {
    this.emit(actionTypes.CHANGE_STORE);
  }
  addChangeListener(listener) {
    this.addListener(actionTypes.CHANGE_STORE, listener);
  }
}
