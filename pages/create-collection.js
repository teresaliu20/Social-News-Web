import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MySelect from '../src/components/MySelect';
import shortid from 'shortid';
import Input from '../src/components/Input';
import Textarea from '../src/components/Textarea';
import validURL from '../src/helpers/validUrlHelper';
import styles from '../src/styles/CreateCollectionForm.scss';
import { createNewCollectionAction } from '../src/actions/collections';
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
  topicsSelected: [],
  topicOptions: [],
  errors: initialErrors,
};

class CreateCollectionForm extends Component {

  static async getInitialProps({ req, query }) {

    let allTopics = [];
    const allTopicsUrl = `${configOptions.hostname}/api/topics/all`;
    const allTopicsResp = await axios.get(allTopicsUrl);

    if (allTopicsResp.status === 200) {
      allTopics = allTopicsResp.data
    }

    return {
      allTopics,
    };
  }

  state = {...initialState};

  componentDidUpdate(prevProps) {
    const { globals } = this.props;
    if (!isEmpty(prevProps.globals.user.data) && isEmpty(globals.user.data)) {
      Router.push('/login');
    }
  }

  componentDidMount() {
    const { globals, allTopics } = this.props;
    if (!globals.user.data || isEmpty(globals.user.data)) {
      Router.push('/login');
    }

    const newTopicOptions = allTopics.map(topic => ({
      label: topic,
      value: topic,
    }))

    this.setState({
      topicOptions: newTopicOptions,
    })
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

    const { name, description, links, errors } = this.state;

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

    if (links.length === 0) {
      newErrors.linkInput = 'Must have at least 1 link';
      isValidForm = false;
    }

    this.setState({
      errors: newErrors,
    });

    return isValidForm;
  }

  handleTopicListChange = (topicList) => {
    this.setState({
      topicsSelected: topicList,
    })
  }

  handleCreateNewCollection = () => {

    const isValid = this.validateForm();

    if (isValid) {
      const { user } = this.props.globals;
      const { name, description, links, topicsSelected } = this.state;
      const topics = topicsSelected.map(topicSelected => topicSelected.value);
      this.props.createNewCollection(name, user.data.id, description, links, topics);
      Router.push('/profile');
    }
  }

  render() {
    const { name, description, links, linkInput, errors, topicsSelected, topicOptions } = this.state;
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
        <p className="form-label">Topics</p>
        <MySelect
          value={topicsSelected}
          onChange={this.handleTopicListChange}
          options={topicOptions}
          isMulti
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
    createNewCollection: (name, userId, description, links, topics) => dispatch(createNewCollectionAction(name, userId, description, links, topics)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollectionForm);
