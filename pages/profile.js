import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import axios from 'axios';
import Router from 'next/router';
import styles from 'styles/Profile.scss';
import CollectionCard from '../src/components/CollectionCard';
import { connect } from 'react-redux'
import Types from '../src/actions/index';
import { getCollectionsAction } from '../src/actions/collections';


class Profile extends React.Component {
  static async getInitialProps({store, isServer, pathname, query}) {

    let user_id = query.id;

    // if no query id is supplied, show logged in user's profile as default
    if (!query.id) {
      return {
        isOwnProfile: true,
      }
    };

    let profile = {};
    let collections = []

    // with the query id, get the profile with the user id supplied
    const profileUrl = `http://127.0.0.1:8000/api/users`;
    const profileResp = await axios.post(profileUrl, {
      user_id,
      isLoggedInUser: false
    });

    if (profileResp.status === 200) {
      profile = profileResp.data;

      // if the profile exists, get collections using the user id from the profile
      const getUserCollectionsUrl = `http://127.0.0.1:8000/api/users/${profile.id}/collections`;
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
    }
  }

  componentDidMount() {
    const {id} = this.props.globals.user;

    if (id) {
      this.props.getCollections(id);
    }
  }


  render() {

    const { isOwnProfile } = this.props;

    // set collections and user to the current logged in user by default
    let { collections, user } = this.props.globals;

    // if user is not viewing their own profile, grab collections and user from initial props
    // created by get request to another user's profile
    if (!isOwnProfile) {
      collections = this.props.collectionsViewing;
      user = this.props.userViewing;
    }

    const { first_name, last_name, email, bio } = user;

    return (
      <div className="profile-page">
        <div className="padded-section">
          <h1>{`${first_name} ${last_name}`}</h1>
          <p className="text-sans-serif">{bio}</p>
        </div>
        <div className="collections-section padded-section form-with-corner-button">
          <h2>Collections</h2>
          
          <Link
            prefetch href="/create-collection">
            <button className="form-button-outline">Create New Collection</button>
          </Link>
        </div>
        <div className="collection-section">
          {
            collections ? collections.map((collection) => {
              return <CollectionCard
                collection={collection}
              />
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
  globals: PropTypes.object,
  getCollections: PropTypes.func,
  isOwnProfile: PropTypes.bool,
  userViewing: PropTypes.object,
  collectionsViewing: PropTypes.object,
};


const mapStateToProps = (state) => ({
  globals: state,
});


const mapDispatchToProps = (dispatch) => {
  return {
    getCollections: (userId) => dispatch(getCollectionsAction(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);