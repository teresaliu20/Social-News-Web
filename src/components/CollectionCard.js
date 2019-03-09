import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from 'styles/CollectionCard.scss';
import moment from 'moment';

const descriptionMaxLength = 200;

const CollectionCard = ({ collection, relation, key }) => {
  const dateCreated = moment(collection.created).format('MMM Do YY');

  return (
    <Link href={`/collection?id=${collection.id}`} key={key}>
      <div className="collection-card">
        <p className="text-sans-serif text-italic highlight">{relation}</p>
        <h2>
          {collection.name}
        </h2>
        <p>
          {collection.description && collection.description.substring(0, descriptionMaxLength)}
        </p>
        <p className="collection-date">{dateCreated}</p>
        <style jsx>{styles}</style>
      </div>
    </Link>
  );
};

CollectionCard.propTypes = {
  key: PropTypes.number,
  collection: PropTypes.object,
  relation: PropTypes.string,
};

export default CollectionCard;
