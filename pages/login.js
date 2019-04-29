import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../src/styles/auth.scss';
import Input from '../src/components/Input';
import { loginAction } from '../src/actions/auth';

const initialErrors = {
  general: '',
  username: '',
  password: '',
};

const initialState = {
  username: '',
  password: '',
  errors: initialErrors,
};

class Login extends Component {
  state = initialState

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (isEmpty(prevProps.user.data) && !isEmpty(user.data)) {
      Router.push('/my-profile');
    }

    else if (prevProps.user.pending && !user.pending && user.error) {
      const newErrors = { ...this.state.errors };
      newErrors.general = user.error;
      this.setState({
        errors: newErrors,
      });
    }
  }

  validateForm = () => {
    const { username, password, errors } = this.state;

    const newErrors = { ...errors };

    let isValidForm = true;

    if (username === '' || username.trim() === '') {
      newErrors.username = 'Username cannot be blank';
      isValidForm = false;
    }

    if (password === '' || password.trim() === '') {
      newErrors.password = 'Password cannot be blank';
      isValidForm = false;
    }

    this.setState({
      errors: newErrors,
    });

    return isValidForm;
  }

  handleLoginSubmit = () => {
    const { username, password } = this.state;
    const { login } = this.props;

    const isValid = this.validateForm();

    if (isValid) {
      this.setState({
        errors: {...initialErrors}
      })
      login(username, password);
    }
  }

  render() {
    const { username, password, errors } = this.state;
    return (
      <div className="login-page">
        <h1>Login</h1>
        <p className="form-error">{errors.general}</p>
        <Input
          label="Username"
          value={username}
          placeholder="Enter your username"
          className="form-input"
          onChange={(event) => this.setState({ username: event.target.value })}
          error={errors.username}
        />
        <Input
          label="Password"
          value={password}
          type="password"
          placeholder="Enter your password"
          className="form-input"
          onChange={(event) => this.setState({ password: event.target.value })}
          error={errors.password}
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
          New here?{' '}
          <Link prefetch href="/signup">Sign up</Link>
        </p>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(loginAction(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
