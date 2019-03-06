import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from 'styles/CollectionCard.scss';

const CollectionCard = ({ collection, relation }) => (
  <Link href={`/collection?id=${collection.id}`}>
    <div className="collection-card">
      <p className="text-sans-serif text-italic">{relation}</p>
      <h2>
        {collection.name}
      </h2>
      <p>
        {collection.description}
      </p>
      <style jsx>{styles}</style>
    </div>
  </Link>
);

CollectionCard.propTypes = {
  collection: PropTypes.object,
  relation: PropTypes.string,
};

export default CollectionCard;
