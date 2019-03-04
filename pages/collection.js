import React, { Component } from 'react';
import styles from 'styles/Collection.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CollectionCard from '../src/components/CollectionCard';
import LinksSection from '../src/components/LinksSection';

const relatedCollections = [
  {
    relationName: 'explained by',
    name: 'first collection',
    description: 'wow what a cool collection!',
  },
  {
    relationName: 'explained by',
    name: 'second collection',
    description: 'wow what a cool collection!',
  },
];


class Collection extends Component {
  static async getInitialProps({ req, query }) {
    if (!query.id) return;
    const url = `http://127.0.0.1:8000/api/collections/${query.id}`;
    const collectionResp = await axios.get(url);
    return {
      collection: collectionResp.data.collectionInfo,
      links: collectionResp.data.links,
    };
  }

  render() {
    const { collection, links } = this.props;

    return (
      <div className="collection-page">
        <div className="padded-section">
          <h1>{collection.name}</h1>
          <p className="text-sans-serif">{collection.description}</p>
          <div className="links-section">
            <LinksSection links={links} />
          </div>
          <h3>Related Collections</h3>
          <div className="collection-section">
            {
            relatedCollections.map((relatedCollection) => (
              <CollectionCard
                relation={relatedCollection.relationName}
                collection={collection}
              />
            ))
          }
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Collection.propTypes = {
  globals: PropTypes.object,
  collection: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});

export default connect(mapStateToProps)(Collection);
