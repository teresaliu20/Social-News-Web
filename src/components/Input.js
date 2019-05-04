import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';

const Input = ({ value, type, placeholder, onChange, label, accept, error, className, buttonClick, buttonLabel, style }) => (

  <div className="form-input-wrapper" style={style}>
    <p className="form-label">{label}</p>
    <div className="form-input-row">
      <input
        value={value}
        type={type}
        accept={accept}
        placeholder={placeholder}
        className={className || 'form-input'}
        onChange={onChange}
      />
      {
        buttonClick
        && (
        <button
          type="submit"
          className="form-button-outline"
          onClick={buttonClick}
        >
          {buttonLabel}
        </button>
        )
      }
    </div>
    {
      error && <p className="form-error">{error}</p>
    }
    <style jsx>{styles}</style>
  </div>
);


Input.propTypes = {
  buttonClick: PropTypes.func,
  buttonLabel: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  accept: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  style: PropTypes.object,
};

export default Input;
