import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from 'styles/CollectionCard.scss';
import moment from 'moment';

const CollectionCard = ({ collection, relation, key }) => {
  const dateCreated = moment(collection.created).format('MMMM Do YYYY');

  const descriptionMaxLength = 230;

  let trimmedDescription = '';
  if (collection.description) {
    trimmedDescription = collection.description.substr(0, descriptionMaxLength);
    trimmedDescription = trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(' ')));
  }
  return (
    <div className="collection-card-wrapper">
      <Link href={`/collection?id=${collection.id}`} key={key}>
        <div className="collection-card clickable">
          <p className="text-sans-serif text-italic highlight">{relation}</p>
          <h2>
            {collection.name}
          </h2>
          <p>
            {`${trimmedDescription}...`}
          </p>
          <p className="collection-date">{dateCreated}</p>
        </div>
      </Link>
      <style jsx>{styles}</style>
    </div>
  );
};

CollectionCard.propTypes = {
  key: PropTypes.number,
  collection: PropTypes.object,
  relation: PropTypes.string,
};

export default CollectionCard;
