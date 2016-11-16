import React, {Component, PropTypes} from 'react';

export default class Container extends Component {
  getStore() {
    return this.props.store;
  }
  render() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        return (
          <section>
            <h1>Top</h1>
            <a href="/dashboard">to dashboard</a>
          </section>
        );
      case '/dashboard':
        return (
          <section>
            <h1>Dashboard</h1>
            <a href="/">to top</a>
          </section>
        );
      default:
        return (
          <section>
            <h1>Not Found</h1>
            <a href="/">to top</a>
          </section>
        );
    }
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
