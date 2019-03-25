import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from 'styles/LinksSection.scss';
import MicrolinkCard from '@microlink/react';
import validURL from '../helpers/validUrlHelper';

const buttonTypeToSVG = {
  'delete': 'static/delete.svg',
  'check': 'static/check.svg',
  'add': 'static/add.svg',
};

class LinksSection extends React.Component {
  render() {
    const { links, sideMenuButtons } = this.props;
    return (
      <div className="links-section">
        {
    links && links.length ? links.map((link) => {
      return (
        <div className="link" key={shortid.generate()}>
          {
            <div>
              <MicrolinkCard
                url={link.url}
              />
              <div className="link-side-menu">
                {
                  sideMenuButtons.map((buttonObj) => (
                    <div className="link-item">
                      <p className="link-item-label">{buttonObj.label}</p>
                      <button
                        type="submit"
                        className="form-button-outline circle-button "
                        onClick={() => buttonObj.handlePress(link)}
                      >
                        <img
                          alt={buttonTypeToSVG[buttonObj.buttonType]}
                          src={buttonTypeToSVG[buttonObj.buttonType]}
                        />
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          }
        </div>
      );
    })
      : <div className="text-sans-serif no-links-text">No links right now! Go out and browse collections to add links to your reading list or add one below.</div>
    }
        <style jsx>{styles}</style>
      </div>
    );
  }
}

LinksSection.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  sideMenuButtons: PropTypes.arrayOf(PropTypes.object),
};

export default LinksSection;
