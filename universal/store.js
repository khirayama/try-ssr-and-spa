import {EventEmitter} from 'events';

import {subscribe} from './dispatcher';

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
      }
    });
  }
  ready(callback) {
    this.on('__READY_APP', callback);
  }
  initialize(state) {
    this.state = state || this.state;
  }
  getState() {
    return Object.assign({}, this.state);
  }
}
