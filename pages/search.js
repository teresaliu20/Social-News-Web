import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import config from '../src/config';
import styles from '../src/styles/Search.scss';
import errorMessages from '../src/constants/errorMessages';
import CollectionCard from '../src/components/CollectionCard';

const configOptions = config[process.env.NODE_ENV || 'development'];

const searchTypes = {
  'USERS': 'Users',
  'COLLECTIONS': 'Collections',
};

const searchTypeOptions = [
  { value: searchTypes.USERS, label: 'Users' },
  { value: searchTypes.COLLECTIONS, label: 'Collections' },
];


class Collection extends Component {
  static async getInitialProps({ req, query }) {
  }

  state = {
    searchQuery: '',
    searchUsersResults: [],
    searchCollectionsResults: [],
    searchTypeSelected: searchTypeOptions[0],
    error: '',
    searchMessage: '',
  }

  handleTypingSearchQuery = async (query) => {
    this.setState({ searchQuery: event.target.value });

    if (query.length < 3) {
      return;
    }

    let error = '';
    const { searchTypeSelected } = this.state;

    if (searchTypeSelected.value === searchTypes.USERS) {
      let searchUsersResults = [];
      const findUsersUrl = `${configOptions.hostname}/api/users/search`;
      const findUsersResp = await axios.post(findUsersUrl, { query });
      let newSearchMessage = ''

      if (findUsersResp.status === 200) {
        searchUsersResults = findUsersResp.data;
        if (searchUsersResults.length === 0) {
          newSearchMessage = 'No users found'
        }
      }
      else {
        error = errorMessages.networkError;
      }

      this.setState({
        searchUsersResults,
        error,
        searchMessage: '',
      });
    }
    else if (searchTypeSelected.value === searchTypes.COLLECTIONS) {
      let searchCollectionsResults = [];

      const findCollectionsUrl = `${configOptions.hostname}/api/collections/search`;
      const findCollectionsResp = await axios.post(findCollectionsUrl, { query });
      let newSearchMessage = ''

      if (findCollectionsResp.status === 200) {
        searchCollectionsResults = findCollectionsResp.data.collections;
        if (searchCollectionsResults.length === 0) {
          newSearchMessage = 'No collections found'
        }
      }
      else {
        error = errorMessages.networkError;
      }

      this.setState({
        searchCollectionsResults,
        error,
        searchMessage: newSearchMessage,
      });
    }
  }

  handleSearchTypeChange = (searchTypeSelected) => {
    this.setState({ searchTypeSelected });
  }

  render() {
    const { searchQuery, searchUsersResults, searchCollectionsResults, error, searchMessage, searchTypeSelected } = this.state;
    const searchType = searchTypeSelected.value;

    return (
      <div className="search-page">
        <div className="padded-section">
          <h1>Search</h1>
          <p className="form-error">{error}</p>
          <div className="search-row">
            <div className="select-wrapper">
              <Select
                value={searchTypeSelected}
                onChange={this.handleSearchTypeChange}
                options={searchTypeOptions}
                placeholder="Users"
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
            </div>
            <input
              value={searchQuery}
              placeholder={`Type to search ${searchType.toLowerCase()}`}
              className="form-input-bordered"
              onChange={(event) => this.handleTypingSearchQuery(event.target.value)}
            />
          </div>
          <p className="text-sans-serif">{searchMessage}</p>
          <div className="search-results">
            {
            searchType === searchTypes.USERS
              ? (
                <div>
                  {
                    searchUsersResults.map((result) => (
                      <Link href={`/profile?id=${result.id}`} key={result.id}>
                        <div className="result-item-user">
                          <h3>{`${result.first_name} ${result.last_name}`}</h3>
                          <p className="text-sans-serif text-light-gray">
                            @{result.username}
                          </p>
                        </div>
                      </Link>
                    ))
                  }
                </div>
              )
              :
              (
                <div className="collection-section">
                  {
                    searchCollectionsResults.map((collection) => {
                      return (
                        <CollectionCard
                          key={collection.id}
                          collection={collection}
                        />
                      );
                    })
                  }
                </div>
              )
          }
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}

Collection.propTypes = {
  globals: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});

export default connect(mapStateToProps)(Collection);
