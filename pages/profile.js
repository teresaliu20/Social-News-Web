import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styles from 'styles/Profile.scss';
import CollectionCard from '../src/components/CollectionCard';
import { connect } from 'react-redux'
import Types from '../src/actions/index';
import { getCollectionsAction } from '../src/actions/collections';


class Profile extends React.Component {
  static async getInitialProps({store, isServer, pathname, query}) {
  }

  componentDidMount() {
    const {id} = this.props.globals.user;

    if (id) {
      this.props.getCollections(id);
    }
  }


  render() {

    const {collections, user} = this.props.globals;
    const { first_name, last_name, email, bio } = user;

    return (
      <div className="profile-page">
        <div className="padded-section">
          <h1>{`${first_name} ${last_name}`}</h1>
          <p className="text-sans-serif">This is your profile! Put in bio here.</p>
        </div>
        <div className="collections-section padded-section form-with-corner-button">
          <h3>Collections</h3>
          
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