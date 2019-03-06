import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'styles/Header.scss';
import { logoutAction } from '../actions/auth';

class Header extends React.Component {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { globals } = this.props;

    if (globals.user) {
      return (
        <header className="header">
          <Link href="/">
            <div className="logo-wrapper">
              <img src="static/puzzles.png" className="logo" alt="puzzle" />
            </div>
          </Link>
          <div className="menu">
            <Link href="/profile">
              <div className="menu-item">
                <a>Profile</a>
              </div>
            </Link>
            <Link href="/search">
              <div className="menu-item">
                <a>Search</a>
              </div>
            </Link>
            <div
              className="menu-item"
              onClick={this.handleLogout}
            >
              <a>Logout</a>
            </div>
          </div>
          <style jsx>{styles}</style>
        </header>
      );
    }
    return (
      <header className="header">
        <Link href="/">
          <div>
            <img src="static/puzzles.png" className="logo" alt="puzzle" />
          </div>
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
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  globals: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
