import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/ModalWrapper.scss';


const ModalWrapper = ({ children, handleModalClose }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <div
          className="close-button clickable"
          onClick={handleModalClose}
        >
          <img src="static/delete.svg" className="logo" alt="close" />
        </div>
        {children}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node,
  handleModalClose: PropTypes.func,
};

export default ModalWrapper;
