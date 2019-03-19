import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';
import Input from '../src/components/Input';
import Textarea from '../src/components/Textarea';
import styles from '../src/styles/CreateCollectionForm.scss';
import { editCollectionAction } from '../src/actions/collections';
import validURL from '../src/helpers/validUrlHelper';
import config from '../src/config';

const configOptions = config[process.env.NODE_ENV || 'development'];


const initialErrors = {
  general: '',
  name: '',
  linkInput: '',
  description: '',
};

const initialState = {
  name: '',
  description: '',
  links: [], // array of url strings
  linkInput: '',
  collectionId: 0,
  errors: initialErrors,
};

class EditCollectionForm extends Component {

  static async getInitialProps({ req, query }) {
    if (!query.id) return;

    let collection = {};
    let links = [];
    let relatedCollections = [];

    const collectionUrl = `${configOptions.hostname}/api/collections/${query.id}`;
    const collectionResp = await axios.get(collectionUrl);

    if (collectionResp.status === 200) {
      collection = collectionResp.data.collectionInfo;
      links = collectionResp.data.links;
    }
    return {
      collection,
      links,
    };
  }

  componentDidUpdate(prevProps) {
    const { globals } = this.props;
    if (!isEmpty(prevProps.globals.user.data) && isEmpty(globals.user.data)) {
      Router.push('/login');
    }
  }

  componentDidMount() {
    const { globals } = this.props;
    if (!globals.user.data || isEmpty(globals.user.data)) {
      Router.push('/login');
    }

    if (!isEmpty(this.props.collection)) {
      const {collection, links} = this.props;
      const linkUrls = links.map(link => link.url);

      this.setState({
        name: collection.name,
        description: collection.description,
        links: linkUrls,
        collectionId: collection.id
      })
    }
  }

  state = initialState;

  validateForm = () => {
    const { name, description, errors } = this.state;

    const newErrors = { ...initialErrors };

    let isValidForm = true;

    if (name === '' || name.trim() === '') {
      newErrors.name = 'Title cannot be blank';
      isValidForm = false;
    }

    if (description === '' || description.trim() === '') {
      newErrors.description = 'Description cannot be blank';
      isValidForm = false;
    }

    this.setState({
      errors: newErrors,
    });

    return isValidForm;
  }

  handleEditCollection = () => {
    
    this.setState({
      errors: {...initialErrors}
    })

    const isValid = this.validateForm();

    if (isValid) {
      const { user } = this.props.globals;
      const { name, description, links, collectionId } = this.state;
      this.props.editCollection(name, user.data.id, description, links, collectionId );
      Router.back();
    }
  }


  handleAddLink = () => {
    const {links, linkInput} = this.state;

    const newErrors = { ...this.state.errors };
    let newLinkError = ""

    if (validURL(linkInput)) {
      const newLinks = [...links, linkInput]
      this.setState({links: newLinks})      
    }
    else {
      const newErrors = { ...this.state.errors };
      newLinkError = "Link is not a valid URL."
    }

    newErrors.linkInput = newLinkError;
    this.setState({
      errors: newErrors,
    })
  }

  handleGoBack = () => {
    Router.back();
  }

  render() {
    const { name, description, links, linkInput, errors } = this.state;

    return (
      <div className="create-collection-page">
        <h1>Edit New Collection</h1>
        <Input
          label="Title"
          value={name}
          placeholder="Collection Title"
          className="form-input"
          onChange={(event) => this.setState({ name: event.target.value })}
          error={errors.name}
        />
        <Textarea
          label="Description"
          value={description}
          placeholder="Type description of collection"
          className="form-textarea"
          onChange={(event) => this.setState({ description: event.target.value })}
          error={errors.description}
        />
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
        <Input
          value={linkInput}
          placeholder="Enter link"
          className="form-input"
          onChange={(event) => this.setState({ linkInput: event.target.value })}
          error={errors.linkInput}
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
            onClick={this.handleEditCollection}
          >
            Edit Collection
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

EditCollectionForm.propTypes = {
  globals: PropTypes.object,
  editCollection: PropTypes.func,
  collection: PropTypes.object,
  links: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    editCollection: (name, userId, description, links, collectionId) => dispatch(editCollectionAction(name, userId, description, links, collectionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCollectionForm);
