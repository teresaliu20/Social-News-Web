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
import config from '../src/config';
import { editProfileAction } from '../src/actions/user';


const configOptions = config[process.env.NODE_ENV || 'development'];

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
    const { first_name, last_name, email, bio, image } = user.data;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email,
      bio,
      image,
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

    Router.push('/my-profile');
  }

  handleEditProfileImage = async (e) => {
    const { user } = this.props;
    const files = Array.from(e.target.files)

    if (files.length > 1) {
      const msg = 'Only 1 image can be uploaded at a time'
      alert(msg)
    }

    const image = files[0]

    const formData = new FormData();
    formData.append('image', image)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const url = `${configOptions.hostname}/api/users/${user.data.id}/profilepicture`;

    const profilepicResp = await axios.post(url, formData, config);
  }

  render() {
    const { firstName, lastName, email, bio, image } = this.state;

    return (
      <div className="padded-section thin-section">
        <h1>Edit Profile</h1>
        <Input
          label="Upload Profile Image"
          type='file'
          id='single'
          accept="image/png, image/jpeg"
          onChange={(e) => this.handleEditProfileImage(e)}/> 
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
