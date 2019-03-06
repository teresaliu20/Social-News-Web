import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from 'styles/LinksSection.scss';
import MicrolinkCard from '@microlink/react';
import validURL from '../helpers/validUrlHelper';

const LinksSection = ({ links }) => (
  <div className="links-section">
    {
    links && links.length ? links.map((link) => {
      console.log(validURL(link.url));
      return (
        <div className="link" key={link.id}>

          {
          validURL(link.url)
            ? (
              <MicrolinkCard
                link={link.url}
              />
            )
            : (
              <p className="text-sans-serif">

&bull;&nbsp;&nbsp;
                <a href={link.url}>{link.url}</a>
              </p>
            )}

        </div>
      );
    })
      : <div>No links right now! </div>
    }
    <style jsx>{styles}</style>
  </div>
);

LinksSection.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
};

export default LinksSection;
