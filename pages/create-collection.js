import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import styles from '../src/styles/CreateCollectionForm.scss';
import { createNewCollectionAction } from '../src/actions/collections';

class CreateCollectionForm extends Component {
  state = {
    name: '',
    description: '',
    links: [],
    linkInput: '',
  }

  handleCreateNewCollection = () => {
    const { user } = this.props.globals;
    const { name, description, links } = this.state;
    this.props.createNewCollection(name, user.id, description, links);
    Router.push('/profile');
  }

  handleAddLink = () => {
    const {links, linkInput} = this.state;
    const newLinks = [...links, linkInput]
    this.setState({links: newLinks})
  }

  handleGoBack = () => {
    Router.push('/profile');
  }

  render() {
    const { name, description, links, linkInput } = this.state;
    return (
      <div className="create-collection-page">
        <h1>Write New Collection</h1>
        <input
          value={name}
          placeholder="Collection Title"
          className="form-input"
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <textarea
          value={description}
          placeholder="Type description of collection"
          className="form-textarea"
          onChange={(event) => this.setState({ description: event.target.value })}
        >
        </textarea>
        <div className="form-with-corner-button">
          <h3>Links</h3>
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleAddLink}
          >
            Add Link
          </button>
        </div>
        <div className="links-section">
        <input
          value={linkInput}
          placeholder="Enter link"
          className="form-input"
          onChange={(event) => this.setState({ linkInput: event.target.value })}
        />
        {
          links && links.length ? links.map((link) => (
            <div className="link" key={shortid.generate()}>
              <p className="text-sans-serif">&bull;&nbsp;&nbsp;<a href={link}>{link}</a></p>
            </div>
          ))
            : <div>No links right now! </div>
          }
        </div>
        <div className="form-button-group-horizontal">
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleGoBack}
          >
            Go Back
          </button>
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleCreateNewCollection}
          >
            Post New Collection
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

CreateCollectionForm.propTypes = {
  globals: PropTypes.object,
  createNewCollection: PropTypes.func,
};

const mapStateToProps = (state) => ({
  globals: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCollection: (name, userId, description, links) => dispatch(createNewCollectionAction(name, userId, description, links)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionForm);
