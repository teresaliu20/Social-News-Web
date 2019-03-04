import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from 'styles/CollectionCard.scss';

const CollectionCard = ({ name, description, relation }) => (
  <Link href={`/collection?slug=${name}`}>
    <div className="collection-card">
      <p className="text-sans-serif text-italic">{relation}</p>
      <h2>
        {name}
      </h2>
      <p>
        {description}
      </p>
      <style jsx>{styles}</style>
    </div>
  </Link>
);

CollectionCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  relation: PropTypes.string,
};

export default CollectionCard;
