import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Footer.scss';

const Footer = () => (

  <div className="footer">
    <p>
      Built with
      {' '}
      {'  '}
      <span role="img" aria-label="heart">💛</span>
      {' '}
      by the Puzzle Team
    </p>
    <div className="footer-left">
      <p>
Have feedback on how we should improve? Contact the developers at
        <span className="underline">teresaliu20@gmail.com</span>
      </p>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default Footer;
