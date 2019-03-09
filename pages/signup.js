import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../src/styles/auth.scss';
import Input from '../src/components/Input';
import { signupAction } from '../src/actions/auth';


class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    error: '',
  }

  componentDidUpdate(prevProps) {
    const { globals } = this.props;
    if (isEmpty(prevProps.globals.user) && !isEmpty(globals.user)) {
      Router.push('/profile');
    }
  }


  handleSignupPress = () => {
    const { password, repeatPassword } = this.state;

    if (password !== repeatPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    this.setState({ error: '' });

    const { signup } = this.props;
    signup(this.state);
  }


  render() {
    const { username, password, repeatPassword, email, firstName, lastName, error } = this.state;
    return (
      <div className="login-page">
        <h1>Signup</h1>
        <p className="error-text">{error}</p>
        <Input
          label="First name"
          className="form-input"
          onChange={(event) => this.setState({ firstName: event.target.value })}
          value={firstName}
          placeholder="Enter your first name"
        />
        <Input
          label="Last name"
          className="form-input"
          onChange={(event) => this.setState({ lastName: event.target.value })}
          value={lastName}
          placeholder="Enter your last name"
        />
        <Input
          label="Username"
          className="form-input"
          onChange={(event) => this.setState({ username: event.target.value })}
          value={username}
          placeholder="Enter your username"
        />
        <Input
          label="Email"
          className="form-input"
          onChange={(event) => this.setState({ email: event.target.value })}
          value={email}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          className="form-input"
          type="password"
          onChange={(event) => this.setState({ password: event.target.value })}
          value={password}
          placeholder="Enter your password"
        />
        <Input
          label="Repeat Password"
          className="form-input"
          type="password"
          onChange={(event) => this.setState({ repeatPassword: event.target.value })}
          value={repeatPassword}
          placeholder="Repeat your password"
        />
        <div className="form-button-group">
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleSignupPress}
          >
          Signup
          </button>
        </div>
        <p>
        Already have an account?
          <Link prefetch href="/login">Login</Link>
        </p>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func,
  globals: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, password) => dispatch(signupAction(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
