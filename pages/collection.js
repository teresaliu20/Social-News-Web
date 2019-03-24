import React, { Component } from 'react';
import styles from 'styles/Collection.scss';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import shortid from 'shortid';
import CollectionCard from '../src/components/CollectionCard';
import LinksSection from '../src/components/LinksSection';
import RelateCollectionForm from '../src/components/RelateCollectionForm';
import config from '../src/config';

const configOptions = config[process.env.NODE_ENV || 'development'];

class Collection extends Component {
  static async getInitialProps({ req, query }) {
    if (!query.id) return;

    let collection = {};
    let links = [];
    let relatedCollections = [];
    let topics = [];

    const collectionUrl = `${configOptions.hostname}/api/collections/${query.id}`;
    const collectionResp = await axios.get(collectionUrl);

    if (collectionResp.status === 200) {
      collection = collectionResp.data.collectionInfo;
      links = collectionResp.data.links;
      topics = collectionResp.data.topics;
    }

    // get related collections
    const relatedCollectionsUrl = `${configOptions.hostname}/api/collections/${query.id}/connected`;
    const relatedCollectionsResp = await axios.get(relatedCollectionsUrl);

    if (relatedCollectionsResp.status === 200) {
      relatedCollections = relatedCollectionsResp.data;
    }
    return {
      collection,
      links,
      relatedCollections,
      topics,
    };
  }

  state = {
    openRelateCollectionForm: false,
    relatedCollectionButtonText: 'Relate a Collection',
  }

  handleAddReadingList = async (linkSelected) => {
    const { user } = this.props.globals;
    const postReadingListUrl = `${configOptions.hostname}/api/users/reading-list`;
    const postLinkResp = await axios.post(postReadingListUrl, {
      user_id: user.data.id,
      url: linkSelected.url,
    });

    if (postLinkResp.status === 200 && postLinkResp.data) {
      alert("Successfully added to reading list!");
    }
  }

  render() {
    const { collection, links, relatedCollections, topics } = this.props;
    const { user } = this.props.globals;
    const { openRelateCollectionForm, relatedCollectionButtonText } = this.state;

    const isOwnCollection = user.data ? (collection.owner === user.data.id) : false;
    const dateCreated = moment(collection.created).format('MMM Do YY');

    let collectionSection = null;

    if (isOwnCollection && relatedCollections.length === 0) {
      collectionSection = (
        <div className="collection-section">
          <p className="text-sans-serif">
          No related collections yet! To add a related section, go out
          and search for collections similar to yours. You can request to
          relate your collection after you read their collection.
          </p>
          <style jsx>{styles}</style>
        </div>
      );
    }

    else if (relatedCollections.length > 0) {
      collectionSection = (
        <div className="collection-section">
          {
            relatedCollections.map((relatedCollection) => (
              <CollectionCard
                key={shortid.generate()}
                relation={relatedCollection.relationship}
                approved={relatedCollection.approved}
                collection={relatedCollection.collectionInfo}
              />
            ))
          }
        </div>
      );
    }

    return (
      <div className="collection-page">
        <div className="padded-section">
          {
            isOwnCollection
            && (
            <Link
              prefetch
              href={`/edit-collection?id=${collection.id}`}
            >
              <button className="form-button-outline corner-button">Edit Collection</button>
            </Link>
            )
          }
          <h1>{collection.name}</h1>
          <p className="collection-date">{dateCreated}</p>
          <Link href={`/profile?id=${collection.author.id}`}>
            <p className="collection-date underline clickable">{`By ${collection.author.first_name} ${collection.author.last_name}`}</p>
          </Link>
          <div className="topics-section">
          {
            topics.map(topic => (
              <Link href={`/topic?name=${topic}`}>
                <div className="topic clickable">
                  <span>#{topic}</span>
                </div>
              </Link>
            ))
          }
          </div>
          <p className="text-sans-serif">{collection.description}</p>
          <div className="links-section">
            <LinksSection
              links={links}
              sideMenuButtons={[
                  {
                    buttonType: 'add',
                    handlePress: this.handleAddReadingList,
                    label: 'Add link to reading list'
                  }
                ]}
            />
          </div>
          <hr className="hr" />
          <h3>Related Collections</h3>
          {
            collectionSection
          }
          {
            !isOwnCollection && (
              <div>
                <hr className="hr" />
                <div className="collections-section form-with-corner-button">
                  <h3>Have a related collection?</h3>
                  {
                openRelateCollectionForm && <RelateCollectionForm collectionToObj={collection} />
              }
                  <button
                    className="form-button-outline"
                    onClick={() => this.setState({
                      openRelateCollectionForm: !this.state.openRelateCollectionForm,
                      relatedCollectionButtonText,
                    })}
                  >
                    { relatedCollectionButtonText }
                  </button>
                </div>
              </div>
            )
          }

        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

Collection.propTypes = {
  globals: PropTypes.object,
  collection: PropTypes.object,
  links: PropTypes.arrayOf(PropTypes.object),
  relatedCollections: PropTypes.arrayOf(PropTypes.object),
  topics: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  globals: state,
});

export default connect(mapStateToProps)(Collection);
