import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';

const Textarea = ({ value, placeholder, onChange, label, error, style, className }) => (

  <div className="form-textarea-wrapper" style={style}>
    <p className="form-label">{label}</p>
    <textarea
      value={value}
      placeholder={placeholder}
      className={className}
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
  className: PropTypes.string,
  height: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  style: PropTypes.object,
};

export default Textarea;
