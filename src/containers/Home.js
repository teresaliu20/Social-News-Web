import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'

import { getTopRepos } from 'actions/repos'
import SearchResults from 'components/SearchResults'

class Home extends Component {

  render () {
    let { repos } = this.props
    return (
      <div>
        <h1>Welcome to Paper!</h1>
      </div>
    )
  }
}

export default Home;