import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { isEmpty } from 'lodash';
import styles from '../src/styles/Profile.scss';
import { connect } from 'react-redux';
import Types from '../src/actions/index';
import Input from '../src/components/Input';
import Textarea from '../src/components/Textarea';
import { editProfileAction } from '../src/actions/user';


class EditProfile extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    bio: '',
    email: ''
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (!isEmpty(prevProps.user.data) && isEmpty(user.data)) {
      Router.push('/login');
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (!user.data || isEmpty(user.data)) {
      Router.push('/login');
    }
    const { first_name, last_name, email, bio } = user.data;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email,
      bio,
    });
  }

  handleEditProfile = () => {
    const { user } = this.props;
    const { firstName, lastName, email, bio } = this.state;
    this.props.editProfile({
      firstName,
      lastName,
      email,
      bio,
      userId: user.data.id,
      username: user.data.username,
      name: user.data.name,
    });

    Router.push('/profile');
  }

  render() {
    const { firstName, lastName, email, bio } = this.state;

    return (
      <div className="padded-section thin-section">
        <h1>Edit Profile</h1>
        <Input
          label="First name"
          value={firstName}
          placeholder="Enter your first Name"
          onChange={(event) => this.setState({ firstName: event.target.value })}
        />
        <Input
          label="Last name"
          value={lastName}
          placeholder="Enter your last Name"
          className="form-input"
          onChange={(event) => this.setState({ lastName: event.target.value })}
        />
        <Input
          label="Email"
          value={email}
          placeholder="Enter your email"
          className="form-input"
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <Textarea
          label="Personal Bio"
          value={bio}
          placeholder="Enter your bio..."
          className="form-textarea"
          onChange={(event) => this.setState({ bio: event.target.value })}
        />
        <div className="form-button-group-horizontal">
          <Link
            prefetch href="/profile">
            <button className="form-button-outline">Go back</button>
          </Link>
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleEditProfile}
          >
            Submit Profile
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

EditProfile.propTypes = {
  user: PropTypes.object,
};


const mapStateToProps = (state) => ({
  user: state.user,
});


const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (profileInfo) => dispatch(editProfileAction(profileInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
