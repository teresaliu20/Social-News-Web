import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from 'styles/LinksSection.scss';
import MicrolinkCard from '@microlink/react';
import validURL from '../helpers/validUrlHelper';

class LinksSection extends React.Component {
  render() {
    const { links, handleDeleteLink } = this.props;
    return (
      <div className="links-section">
        {
    links && links.length ? links.map((link) => {
      return (
        <div className="link" key={shortid.generate()}>
          {
            validURL(link.url) && (
            <div>
              <MicrolinkCard
                url={link.url}
              />
              <div className="link-side-menu">
                {
                  handleDeleteLink && (
                    <button
                      type="submit"
                      className="links-hover-button form-button-outline"
                      onClick={() => handleDeleteLink(link.id)}
                    >
                        X
                    </button>
                  )
                }
              </div>
            </div>
            )
          }
        </div>
      );
    })
      : <div>No links right now! </div>
    }
        <style jsx>{styles}</style>
      </div>
    );
  }
}

LinksSection.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  handleDeleteLink: PropTypes.func,
};

export default LinksSection;
