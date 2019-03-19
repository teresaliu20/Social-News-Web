import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';

const Input = ({ value, type, placeholder, onChange, label, error }) => (

  <div className="form-input-wrapper">
    <p className="form-label">{label}</p>
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      className="form-input"
      onChange={onChange}
    />
    {
      error && <p className="form-error">{error}</p>
    }
    <style jsx>{styles}</style>
  </div>
);


Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default Input;
