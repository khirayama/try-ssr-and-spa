import React, {Component, PropTypes} from 'react';

import {dispatch} from 'universal/dispatcher';
import types from 'universal/action-types';

function changeLocation(pathname) {
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
    changeLocation(this.props.href);
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
  _dirtySetTitle(state, title) {
    state._title = title;
    this.props.store.state._title = title;
    if (typeof window === 'object') {
      window.document.title = state._title;
    }
  }
  render() {
    const state = this.props.store.getState();

    switch (state.pathname) {
      case '/':
        this._dirtySetTitle(state, 'Top');
        return (
          <section>
            <h1>Top</h1>
            <Link href="/dashboard">to dashboard</Link>
          </section>
        );
      case '/dashboard':
        this._dirtySetTitle(state, 'Dashboard');
        return (
          <section>
            <h1>Dashboard</h1>
            <Link href="/">to top</Link>
          </section>
        );
      default:
        this._dirtySetTitle(state, 'Not Found');
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
