import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from 'styles/CollectionCard.scss';

const CollectionCard = ({ title, description, relation }) => (
  <Link href={`/collection?slug=${title}`}>
    <div className="collection-card">
      <p className="text-sans-serif text-italic">{relation}</p>
      <h2>
        {title}
      </h2>
      <p>
        {description}
      </p>
      <style jsx>{styles}</style>
    </div>
  </Link>
);

CollectionCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  relation: PropTypes.string,
};

export default CollectionCard;
