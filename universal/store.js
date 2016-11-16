import {EventEmitter} from 'events';

import {subscribe} from './dispatcher';

const EVENT_CHANGE = '__CHANGE_STORE';

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
        case 'START_APP':
          this.state.load = true;
          this.state.pathname = action.pathname;
          this.emit('__READY_APP');
          break;
        case 'CHANGE_HISTORY':
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
    this.on('__READY_APP', callback);
  }
  dispatchChange() {
    this.emit(EVENT_CHANGE);
  }
  addChangeListener(listener) {
    this.addListener(EVENT_CHANGE, listener);
  }
}
