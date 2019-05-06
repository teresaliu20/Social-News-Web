import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../src/styles/auth.scss';
import Input from '../src/components/Input';
import { signupAction } from '../src/actions/auth';
import validEmail from '../src/helpers/validEmailHelper';
import validPassword from '../src/helpers/validPasswordHelper';


const initialErrors = {
  general: '',
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
};

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  errors: initialErrors,
}

class Signup extends Component {
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
    const { firstName, lastName, username, password, repeatPassword, email, errors } = this.state;

    const newErrors = {...initialErrors};

    let isValidForm = true;

    if (password != repeatPassword) {
      newErrors.repeatPassword = 'Repeated password does not match original password'
      isValidForm = false;
    }

    if (username === '' || username.trim() === '') {
      newErrors.username = 'Username cannot be blank';
      isValidForm = false;
    }
    else if (username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
      isValidForm = false;
    }

    if (firstName === '' || firstName.trim() === '') {
      newErrors.firstName = 'First name cannot be blank';
      isValidForm = false;
    }

    if (lastName === '' || lastName.trim() === '') {
      newErrors.lastName = 'Last name cannot be blank';
      isValidForm = false;
    }

    if (email === '' || email.trim() === '') {
      newErrors.email = 'Email cannot be blank';
      isValidForm = false;
    }
    else if (!validEmail(email)) {
      newErrors.email = 'Email is not valid';
      isValidForm = false;
    }

    if (password === '' || password.trim() === '') {
      newErrors.password = 'Password cannot be blank';
      isValidForm = false;
    }
    else if (!validPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters and include 1 numerical character';
      isValidForm = false;
    }

    this.setState({
      errors: newErrors,
    });

    return isValidForm;
  }



  handleSignupSubmit = () => {
    const { signup } = this.props;

    const isValid = this.validateForm();

    if (isValid) {
      this.setState({
        errors: {...initialErrors}
      })
      signup(this.state);
    }
  }


  render() {
    const { username, password, repeatPassword, email, firstName, lastName, errors } = this.state;
    return (
      <div className="login-page">
        <h1>Signup</h1>
        <p className="form-error">{errors.general}</p>
        <Input
          label="First name"
          className="form-input"
          onChange={(event) => this.setState({ firstName: event.target.value })}
          value={firstName}
          error={errors.firstName}
          placeholder="Enter your first name"
        />
        <Input
          label="Last name"
          className="form-input"
          onChange={(event) => this.setState({ lastName: event.target.value })}
          value={lastName}
          error={errors.lastName}
          placeholder="Enter your last name"
        />
        <Input
          label="Username"
          className="form-input"
          onChange={(event) => this.setState({ username: event.target.value })}
          value={username}
          error={errors.username}
          placeholder="Enter your username"
        />
        <Input
          label="Email"
          className="form-input"
          onChange={(event) => this.setState({ email: event.target.value })}
          value={email}
          error={errors.email}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          className="form-input"
          type="password"
          onChange={(event) => this.setState({ password: event.target.value })}
          value={password}
          error={errors.password}
          placeholder="Enter your password"
        />
        <Input
          label="Repeat Password"
          className="form-input"
          type="password"
          onChange={(event) => this.setState({ repeatPassword: event.target.value })}
          value={repeatPassword}
          error={errors.repeatPassword}
          placeholder="Repeat your password"
        />
        <div className="form-button-group">
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleSignupSubmit}
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
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, password) => dispatch(signupAction(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
