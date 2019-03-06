import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from 'styles/LinksSection.scss';

const LinksSection = ({ links }) => (
  <div className="links-section">
    {
    links && links.length ? links.map((link) => (
      <div className="link" key={shortid.generate()}>
        <p className="text-sans-serif">
          &bull;&nbsp;&nbsp;
          <a href={link.url}>{link.url}</a>
        </p>
      </div>
    ))
      : <div>No links right now! </div>
    }
    <style jsx>{styles}</style>
  </div>
);

LinksSection.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
};

export default LinksSection;
