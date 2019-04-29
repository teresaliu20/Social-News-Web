import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import styles from 'styles/Profile.scss';
import { connect } from 'react-redux';
import CollectionCard from '../src/components/CollectionCard';
import UserPreview from '../src/components/UserPreview';
import ModalWrapper from '../src/components/ModalWrapper';
import Types from '../src/actions/index';
import { getCollectionsAction } from '../src/actions/collections';
import { getFollowingsAction, addFollowingAction } from '../src/actions/social';
import config from '../src/config';

const configOptions = config[process.env.NODE_ENV || 'development'];


class MyProfile extends React.Component {

  state = {
    followingsModalOpen: false,
    followersModalOpen: false,
    followers: [],
    isFollowing: false,
    imageUploaderOpen: false,
  }

  openFollowingsModal = () => {
    this.setState({
      followingsModalOpen: true,
    })
  }

  closeFollowingsModal = () => {
    this.setState({
      followingsModalOpen: false,
    })
  }

  openFollowersModal = () => {
    this.setState({
      followersModalOpen: true,
    })
  }

  closeFollowersModal = () => {
    this.setState({
      followersModalOpen: false,
    })
  }

  handleOpenImageUploader = () => {
    this.setState({
      imageUploaderOpen: true,
    })
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
    formData.append('file', image)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const url = `${configOptions.hostname}/api/users/${user.data.id}/profilepicture`;

    const followersResp = await axios.post(url, formData, config);

    if (followersResp.status === 200) {
      this.setState({
        followers: followersResp.data
      })
    }
  }

  componentDidMount = async () => {
    const { user, followings } = this.props;
    if (!user.data || isEmpty(user.data)) {
      Router.push('/login');
    }

    const { id } = user.data;

    if (id) {
      this.props.getCollections(id);
      this.props.getFollowings(id);
    }

    const url = `${configOptions.hostname}/api/users/${user.data.id}/followers`;

    const followersResp = await axios.get(url);

    if (followersResp.status === 200) {
      this.setState({
        followers: followersResp.data
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { user, followings } = this.props;
    if (!isEmpty(prevProps.user.data) && isEmpty(user.data)) {
      Router.push('/login');
    }
  }


  render() {
    const { followings } = this.props;

    const { followingsModalOpen, followersModalOpen, followers, imageUploaderOpen } = this.state;

    // set collections and user to the current logged in user by default
    let { collections } = this.props;

    let userInfo = this.props.user.data;

    const { first_name, last_name, email } = userInfo;

    let { bio } = userInfo;

    if (!bio)
      bio = 'Welcome! Edit your profile to add a short bio about yourself.';

    return (
      <div className="profile-page">
        <div className="padded-section">
          {
          <div className="profile-image-wrapper">
            <img className="profile-image" src="static/blankprofile.png"/>
            <div className="edit-profile-hover clickable" >
            <label for="single">Edit</label>
              <input type='file' id='single' accept="image/png, image/jpeg" onChange={(e) => this.handleEditProfileImage(e)}/> 
            </div>
          </div>
          }
          {
           (
            <div className="corner-menu">
              <p>
                <span className="underline-clickable" onClick={this.openFollowersModal}>{`${followers.length} Followers`}</span>
                <span>{`  · `}</span>
                <span className="underline-clickable" onClick={this.openFollowingsModal}>{`${followings.length} Following`}</span>
              </p>

              <Link
                prefetch
                href="/edit-profile"
              >
                <button className="form-button-outline">Edit Profile</button>
              </Link>

            </div>
            )
          }
          <div className="profile-info">
          <h1>{`${first_name} ${last_name}`}</h1>
          <p className="text-sans-serif">{bio}</p>
          </div>
        </div>
        <div className="collections-section padded-section form-with-corner-button">
          <h2>Collections</h2>
          <Link
            prefetch
            href="/create-collection"
          >
            <button className="form-button-outline">Create New Collection</button>
          </Link>
        </div>
        <div className="collection-section">
          {
            collections ? collections.map((collection) => {
              return (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                />
              );
            })
              : <div>Loading collections</div>
          }
        </div>
        {
          (followingsModalOpen) &&
          (<ModalWrapper
              handleModalClose={this.closeFollowingsModal}
            >
            <h2 className="modal-header">Who You're Following</h2>
            <div className="scrollable">
            {
              followings.map(following => (
                <UserPreview user={following} />))
            }
            </div>
           </ModalWrapper>)
        }
        {
          (followersModalOpen) &&
          (<ModalWrapper
              handleModalClose={this.closeFollowersModal}
            >
            <h2 className="modal-header">Who's Following You</h2>
            <div className="scrollable">
            {
              followers.map(follower => (
                <UserPreview user={follower} />))
            }
            </div>
           </ModalWrapper>)
        }
        <style jsx>{styles}</style>
      </div>
    );
  }
}

MyProfile.propTypes = {
  user: PropTypes.object,
  collections: PropTypes.arrayOf(PropTypes.object),
  getCollections: PropTypes.func,
  isOwnProfile: PropTypes.bool,
  userViewing: PropTypes.object,
  collectionsViewing: PropTypes.object,
};


const mapStateToProps = (state) => ({
  user: state.user,
  collections: state.collections,
  followings: state.social.followings,
  followers: state.social.followers,
});


const mapDispatchToProps = (dispatch) => {
  return {
    getCollections: (userId) => dispatch(getCollectionsAction(userId)),
    getFollowings: (userId) => dispatch(getFollowingsAction(userId)),
    addFollowing: (userId) => dispatch(addFollowingAction(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
