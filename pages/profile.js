import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import styles from 'styles/Profile.scss';
import { connect } from 'react-redux';
import CollectionCard from '../src/components/CollectionCard';
import Types from '../src/actions/index';
import { getCollectionsAction } from '../src/actions/collections';
import config from '../src/config';

const configOptions = config[process.env.NODE_ENV || 'development'];


class Profile extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    const user_id = query.id;

    // if no query id is supplied, show logged in user's profile as default
    if (!query.id) {
      return {
        isOwnProfile: true,
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
      isOwnProfile: false,
    };
  }

  componentDidMount() {
    const { user, isOwnProfile } = this.props;
    if (isOwnProfile && (!user.data || isEmpty(user.data))) {
      Router.push('/login');
    }

    const { id } = user.data;

    if (id) {
      this.props.getCollections(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { user, isOwnProfile } = this.props;
    if (isOwnProfile && !isEmpty(prevProps.user.data) && isEmpty(user.data)) {
      Router.push('/login');
    }
  }


  render() {
    const { isOwnProfile } = this.props;

    // set collections and user to the current logged in user by default
    let { collections } = this.props;

    let userInfo = this.props.user.data;

    // if user is not viewing their own profile, grab collections and user from initial props
    // created by get request to another user's profile
    if (!isOwnProfile) {
      collections = this.props.collectionsViewing;
      userInfo = this.props.userViewing;
    }

    const { first_name, last_name, email } = userInfo;

    let { bio } = userInfo;

    if (!bio)
      bio = isOwnProfile ? 'Welcome! Edit your profile to add a short bio about yourself.' : 'No bio yet.';


    return (
      <div className="profile-page">
        <div className="padded-section form-with-corner-button">
          {/*
          <div className="profile-image-wrapper">
              <img className="profile-image" src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/46011115_1144893639011707_5262389549639663616_o.jpg?_nc_cat=104&_nc_ht=scontent-lax3-1.xx&oh=c722ca9556484c970297dbb977c2e7f0&oe=5D1423DE" />
          </div>
          */}
          {
            isOwnProfile && (
            <Link
              prefetch
              href="/edit-profile"
            >
              <button className="form-button-outline">Edit Profile</button>
            </Link>
            )
          }
          <h1>{`${first_name} ${last_name}`}</h1>
          <p className="text-sans-serif">{bio}</p>
        </div>
        <div className="collections-section padded-section form-with-corner-button">
          <h2>Collections</h2>
          {
            isOwnProfile && (
            <Link
              prefetch
              href="/create-collection"
            >
              <button className="form-button-outline">Create New Collection</button>
            </Link>
            )
          }

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
});


const mapDispatchToProps = (dispatch) => {
  return {
    getCollections: (userId) => dispatch(getCollectionsAction(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
