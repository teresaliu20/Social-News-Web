import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Input from '../src/components/Input';
import Textarea from '../src/components/Textarea';
import validURL from '../src/helpers/validUrlHelper';
import styles from '../src/styles/CreateCollectionForm.scss';
import { createNewCollectionAction } from '../src/actions/collections';


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

class CreateCollectionForm extends Component {
  state = {...initialState};

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
    Router.push('/profile');
  }

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

  handleCreateNewCollection = () => {

    const isValid = this.validateForm();

    if (isValid) {
      const { user } = this.props.globals;
      const { name, description, links } = this.state;
      this.props.createNewCollection(name, user.data.id, description, links);
      Router.push('/profile');
    }
  }

  render() {
    const { name, description, links, linkInput, errors } = this.state;
    return (
      <div className="create-collection-page">
        <h1>Write New Collection</h1>
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
