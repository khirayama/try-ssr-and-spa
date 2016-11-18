import React, {Component, PropTypes} from 'react';

import {dispatch} from 'universal/dispatcher';
import types from 'universal/action-types';

import {changeLocation} from 'universal/actions/application-action-creators';

class Link extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    event.preventDefault();

    const pathname = this.props.href;

    if (history) {
      history.pushState(null, null, pathname);
    }
    changeLocation(pathname);
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
  updateTitle(title) {
    window.document.title = title;
  }
  render() {
    const state = this.props.store.getState();

    if (typeof window === 'object') {
      this.updateTitle(state.title);
    }

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
