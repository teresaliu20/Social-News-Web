import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';
import Select from 'react-select';

const MySelect = ({ value, placeholder, onChange, options, isMulti, label, error }) => (

  <div className="form-select-wrapper">
    <p className="form-label">{label}</p>
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: 'rgba(240,170,27,0.2)',
          primary50: 'rgba(240,170,27,0.4)',
          primary75: 'rgba(240,170,27,0.6)',
          primary: 'rgba(240,170,27,0.6)',
          neutral20: '#8F8D87',
        },
      })}
    />
    {
      error && <p className="form-error">{error}</p>
    }
    <style jsx>{styles}</style>
  </div>
);


MySelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isMulti: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.objects),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default MySelect;
