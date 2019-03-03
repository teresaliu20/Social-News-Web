import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'styles/auth.scss';
import { loginAction } from '../actions/auth';

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    const { globals } = this.props;
    if (isEmpty(prevProps.globals.user) && !isEmpty(globals.user)) {
      Router.push('/profile');
    }
  }

  handleLoginSubmit = () => {
    const { username, password } = this.state;
    const { login } = this.props;

    login(username, password);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-page">
        <h1>Login</h1>
        <input
          value={username}
          placeholder="Enter your username"
          className="form-input"
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <input
          value={password}
          placeholder="Enter your password"
          className="form-input"
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <div className="form-button-group">
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleLoginSubmit}
          >
            Login
          </button>
        </div>
        <p>
          New here?
          <Link prefetch href="/signup">Sign up</Link>
        </p>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  globals: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);