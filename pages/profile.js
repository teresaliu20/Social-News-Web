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


class Profile extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    const user_id = query.id;

    // if no query id is supplied, show logged in user's profile as default
    if (!query.id) {
      return {
        notFound: true,
      };
    }

    let profile = {};
    let collections = [];

    // with the query id, get the profile with the user id supplied
    const profileUrl = `${configOptions.hostname}/api/users`;
    const profileResp = await axios.post(profileUrl, {
      user_id,
      isLoggedInUser: false,
    });

    if (profileResp.status === 200) {
      profile = profileResp.data;

      // if the profile exists, get collections using the user id from the profile
      const getUserCollectionsUrl = `${configOptions.hostname}/api/users/${profile.id}/collections`;
      const collectionsResp = await axios.get(getUserCollectionsUrl);

      if (collectionsResp.status === 200 && collectionsResp.data) {
        collections = collectionsResp.data.collections;

      }
    }

    // return the user profile and collections to render on the profile page
    return {
      userViewing: profile,
      collectionsViewing: collections,
    };
  }

  state = {
    isFollowing: false,
    isLoggedIn: false,
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

  handleAddFollowing = async () => {
    const { user } = this.props;
    const followerId = user.data.id;

    const followingId = this.props.userViewing.id;

    const url = `${configOptions.hostname}/api/users/${followerId}/following`;

    const followingResp = await axios.post(url, {
      following_id: followingId,
    })

    if (followingResp.status === 200) {
      this.props.getFollowings(user.data.id);
    }
    else {
      alert("Error adding following!");
    }
  }

  handleDeleteFollowing = async () => {
    const { user } = this.props;
    const followerId = user.data.id;

    const followingId = this.props.userViewing.id;

    const url = `${configOptions.hostname}/api/users/${followerId}/following`;

    const followingResp = await axios.delete(url, {
      data: {
        following_id: followingId,
      }
     });

    if (followingResp.status === 200) {
      this.props.getFollowings(user.data.id);
    }
    else {
      alert("Error deleting following!");
    }
  }

  componentDidMount = async () => {
    const { user, followings, userViewing, notFound } = this.props;
    if (!user.data || isEmpty(user.data)) {
      this.setState({
        isLoggedIn: false,
      })
    }
    else {
      this.setState({
        isLoggedIn: true,
      })
    }

    if (!notFound && followings.find(following => userViewing.id === following.id)) {
      this.setState({
        isFollowing: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { followings, userViewing, notFound } = this.props;

    if (!notFound && prevProps.followings.length !== followings.length) {
      this.setState({
        isFollowing: followings.find(following => userViewing.id === following.id)
      })
    }
  }

  getViewableCollection = () => {
    let collections = this.props.collectionsViewing;

    const { isFollowing } = this.state;
    console.log(collections)
    if (isFollowing) {
      collections = collections.filter(collection => collection.permission === 'Network' || collection.permission === 'Public')
    }
    else {
      collections = collections.filter(collection => collection.permission === 'Public')
    }

    return collections
  }

  render() {

    if (this.props.notFound) {
      return <h1>Oh no! This user is not found</h1>
    }

    const { isFollowing, isLoggedIn } = this.state;
    const collections = this.getViewableCollection();

    const userInfo = this.props.userViewing;

    const { first_name, last_name, email } = userInfo;

    let { bio } = userInfo;

    if (!bio) {
      bio = 'No bio yet.';
    }
    return (
      <div className="profile-page">
        <div className="padded-section">
          {
          <div className="profile-image-wrapper">
            <img className="profile-image" src="static/blankprofile.png"/>
          </div>
          }
          {
            isLoggedIn &&
           (
            <div className="corner-menu">
              {
                isFollowing ? 
                <div
                className="follow-button following clickable"
                onClick={this.handleDeleteFollowing}
                 >
                   Following
                </div>
                :
                <div
                  className="follow-button clickable"
                  onClick={this.handleAddFollowing}
                 >
                   Follow
                </div>
              }
            </div>
            )
          }
          <h1>{`${first_name} ${last_name}`}</h1>
          <p className="text-sans-serif">{bio}</p>
        </div>
        <div className="collections-section padded-section form-with-corner-button">
          <h2>Collections</h2>
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
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Profile.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
