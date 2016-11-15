import React, {Component, PropTypes} from 'react';

export default class Container extends Component {
  getStore() {
    return this.props.store;
  }
  render() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/dashboard':
        return <div>Dashboard</div>;
      default:
        return <div>Top</div>;
    }
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
