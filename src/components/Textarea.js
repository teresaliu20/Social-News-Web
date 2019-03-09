import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';

const Textarea = ({ value, placeholder, onChange, label, error }) => (

  <div className="form-textarea-wrapper">
    <p className="form-label">{label}</p>
    <textarea
      value={value}
      placeholder={placeholder}
      className="form-textarea-temp"
      onChange={onChange}
    />
    {
      error && <p className="form-error">{error}</p>
    }
    <style jsx>{styles}</style>
  </div>
);


Textarea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default Textarea;
