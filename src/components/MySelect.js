import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles/base.scss';
import Select from 'react-select';

const customStyles = {
  control: (base, state) => ({
    ...base,
    // match with the menu
    borderRadius: state.isFocused ? '4px 4px 0 0' : 4,
    // Overwrittes the different states of border
    padding: 6,
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    textAlign: 'left',
    // prevent menu to scroll y
    wordWrap: 'break-word',
  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#f6d87b',
    color: 'white',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
  }),
};

const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'rgba(240,170,27,0.2)',
    primary50: 'rgba(240,170,27,0.4)',
    primary75: 'rgba(240,170,27,0.6)',
    primary: 'rgba(240,170,27,0.6)',
    neutral20: '#8F8D87',
  },
});

const MySelect = ({ value, placeholder, onChange, options, isMulti, label, error, style }) => (

  <div className="form-select-wrap" style={style}>
    {
      label && <p className="form-label">{label}</p>
    }
    <Select
      value={value}
      onChange={onChange}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      isMulti={isMulti}
      theme={customTheme}
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
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  style: PropTypes.object,
};

export default MySelect;
