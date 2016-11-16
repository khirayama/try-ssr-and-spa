import React, {Component, PropTypes} from 'react';

import {dispatch} from 'universal/dispatcher';
import types from 'universal/action-types';

function changeHistory(pathname) {
  if (history) {
    history.pushState(null, null, pathname);
  }
  dispatch({
    type: types.CHANGE_HISTORY,
    pathname,
  });
};

class Link extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    event.preventDefault();
    changeHistory(this.props.href);
  }
  render() {
    return <a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>;
  }
}

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

    this.updateState = this._updateState.bind(this);
  }
  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
  }
  _updateState() {
    this.setState({store: this.props.store});
  }
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
            <Link href="/dashboard">to dashboard</Link>
          </section>
        );
      case '/dashboard':
        return (
          <section>
            <h1>Dashboard</h1>
            <Link href="/">to top</Link>
          </section>
        );
      default:
        return (
          <section>
            <h1>Not Found</h1>
            <Link href="/">to top</Link>
          </section>
        );
    }
  }
}

Container.propTypes = {
  store: PropTypes.object.isRequired,
};
