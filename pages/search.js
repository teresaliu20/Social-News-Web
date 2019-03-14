import React, { Component } from 'react';
import styles from '../src/styles/Search.scss';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../src/config';

const configOptions = config[process.env.NODE_ENV || 'development'];


class Collection extends Component {
  static async getInitialProps({ req, query }) {
  }

  state = {
    searchQuery: '',
    searchResults: []
  }

  handleTypingSearchQuery = async (query) => {

    this.setState({ searchQuery: event.target.value });

    if (query.length < 3) {
      return;
    };

    console.log(query)
    

    let searchResults = [];
    const findUsersUrl = `${configOptions.hostname}/api/users/find`;
    const findUsersReponse = await axios.post(findUsersUrl, {query});

    console.log(findUsersReponse)
    if (findUsersReponse.status === 200) {
      searchResults = findUsersReponse.data;
    }

    this.setState({
      searchResults,
    })

  }

  render() {
    const { searchQuery, searchResults } = this.state;
    
    return (
      <div className="search-page">
        <div className="padded-section">
          <h1>Search for User</h1>
          <input
            value={searchQuery}
            placeholder="Type to search for a user"
            className="form-input"
            onChange={(event) => this.handleTypingSearchQuery(event.target.value)}
          />
          <div className="search-results">
          {
            searchResults.map(result => (
              <Link href={`/profile?id=${result.id}`} key={result.id}>
                <div className="result-item">
                  <h3>{`${result.first_name} ${result.last_name}`}</h3>
                  <p>{result.username}</p>
                </div>
              </Link>
            ))
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
