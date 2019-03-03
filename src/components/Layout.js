import React, { PureComponent } from 'react';
import styles from 'styles/base.scss';
import Header from './Header';

export default class Layout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="body">
        <Header />
        <div className="layout">
          { children }
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}
