import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'styles/Header.scss';


class Header extends React.Component {
  render() {
    const { globals } = this.props;

    if (globals.user) {
      return (
        <header className="header">
          <Link href="/">
            <h3>Paper</h3>
          </Link>
          <div className="menu">
            <Link href="/profile">
              <div className="menu-item">
                <a>Profile</a>
              </div>
            </Link>
          </div>
          <style jsx>{styles}</style>
        </header>
      );
    }
    return (
      <header className="header">
        <Link href="/">
          <h3>Paper</h3>
        </Link>
        <div className="menu">
          <Link href="/login">
            <div className="menu-item">
              <a>Login</a>
            </div>
          </Link>
          <Link href="/signup">
            <div className="menu-item">
              <a>Signup</a>
            </div>
          </Link>
        </div>
        <style jsx>{styles}</style>
      </header>
    );
  }
}


Header.propTypes = {
  globals: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});


export default connect(mapStateToProps)(Header);
