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


class Topic extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    const topicName = query.name;

    // HARDCODED get collections
    let collections = [];

    // if the profile exists, get collections using the user id from the profile
    const allTopicCollectionsUrl = `${configOptions.hostname}/api/topic/${topicName}`;
    const collectionsResp = await axios.get(allTopicCollectionsUrl);

    if (collectionsResp.status === 200 && collectionsResp.data) {
      collections = collectionsResp.data.collections;
    }

    // return the user profile and collections to render on the profile page
    return {
      topicName,
      collections
    };
  }

  componentDidMount() {
    const { globals, isOwnProfile } = this.props;
    if (isOwnProfile && (!globals.user.data || isEmpty(globals.user.data))) {
      Router.push('/login');
    }

    const { id } = globals.user.data;

    if (id) {
      this.props.getCollections(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { globals, isOwnProfile } = this.props;
    if (isOwnProfile && !isEmpty(prevProps.globals.user.data) && isEmpty(globals.user.data)) {
      Router.push('/login');
    }
  }


  render() {

    const { collections, topicName } = this.props;

    return (
      <div className="profile-page">
        <div className="padded-section">
          <h1>{topicName}</h1>
          <p className="text-sans-serif">{`${collections.length} collections`}</p>
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

Topic.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
