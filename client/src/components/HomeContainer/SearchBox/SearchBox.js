import React, { Component } from 'react';
import './SearchBox.scss';
import searchIcon from './icons/search-icon.svg';

class SearchBox extends Component {

  handleSubmit = () => {
    console.log("HandleSubmit");
  }

  render() {
    return (
      <div className="SearchBox rounded sticky-top">
        <div className="Wrapper">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Faire une recherche&hellip;" />
          </form>
          <button className="SearchIcon" type="submit">
              <span >
                <img src={searchIcon} alt=""/>
              </span>
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBox;
