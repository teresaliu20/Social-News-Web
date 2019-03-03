import React, { Component } from 'react';
import Link from 'next/link';
import styles from 'styles/Profile.scss';
import CollectionCard from '../src/components/CollectionCard';
import { connect } from 'react-redux'
import Types from '../src/actions/index';

class Profile extends React.Component {
  static async getInitialProps({store, isServer, pathname, query}) {
    store.dispatch({type: Types.GET_USER}); // component will be able to read from store's state when rendered
  }

  handleCollectionCardClick = () => {

  }

  render() {
    const collections = [
      {
        title: 'first collection',
        description: 'wow what a cool collection!',
      },
      {
        title: 'second collection',
        description: 'wow what a cool collection!',
      },
      {
        title: 'third collection',
        description: 'wow what a cool collection!',
      },
    ];

    return (
      <div className="profile-page">
        <div className="padded-section">
          <h1>Welcome to Paper!</h1>
          <p className="text-sans-serif">This is your profile.</p>
        </div>
        <div className="collection-section">
          {
            collections.map((collection) => (
              <CollectionCard
                title={collection.title}
                description={collection.description}
              />
            ))
          }
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default connect()(Profile);
