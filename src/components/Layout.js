import React, { PureComponent } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import Header from './Header';

class Layout extends PureComponent {
  componentDidMount() {
    const { globals } = this.props;
    if (!globals.user || isEmpty(globals.user)) {
      Router.push('/login');
    }
  }

  componentDidUpdate(prevProps) {
    const { globals } = this.props;
    if (!isEmpty(prevProps.globals.user) && isEmpty(globals.user)) {
      Router.push('/login');
    }
  }

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

Layout.propTypes = {
  globals: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});

export default connect(mapStateToProps)(Layout);
