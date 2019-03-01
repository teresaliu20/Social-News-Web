import React, { PureComponent } from 'react';
import styles from 'styles/Layout.scss';
import Header from './Header';

export default class Layout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <Header />
        { children }
        <style jsx>{styles}</style>
      </div>
    );
  }
}
