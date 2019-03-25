import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Footer.scss';

const Footer = () => (

  <div className="footer padded-section">
    <p>
      Built with
      {' '}
      {'  '}
      <span role="img" aria-label="heart">💛</span>
      {' '}
      by the Puzzle Team
    </p>
    <p>
      Have feedback on how we should improve? Contact the developers at
      {' '}
      {' '}
      <span className="underline">teresaliu20@gmail.com</span>
    </p>
    <p>
      Have a bug to report?
      {' '}
      <a href="https://goo.gl/forms/82a1N1oyexfuh0fy1">
      Report it here!
        {' '}
      </a>
    </p>
    <style jsx>{styles}</style>
  </div>
);

export default Footer;
