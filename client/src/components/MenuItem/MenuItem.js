import PropTypes from 'prop-types';
import React from 'react';
import './MenuItem.scss';

const MenutItem = ({ index, menu }) => {
  return <a className={`MenuItem ${index === 0 && 'active'}`} href="#MenuItem">
    <img src={menu.logo} alt={menu.label} />
    <span>{menu.label}</span>
  </a>
}

MenutItem.propTypes = {
  logo: PropTypes.string,
  label: PropTypes.string
};

export default MenutItem;
