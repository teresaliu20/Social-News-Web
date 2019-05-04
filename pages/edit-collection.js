import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';
import MySelect from '../src/components/MySelect';
import Input from '../src/components/Input';
import Textarea from '../src/components/Textarea';
import styles from '../src/styles/CreateCollectionForm.scss';
import { editCollectionAction, deleteCollectionAction } from '../src/actions/collections';
import validURL from '../src/helpers/validUrlHelper';
import permissionOptions from '../src/constants/collectionPermissions';
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
  permissionSelected: permissionOptions[0],
  permissionOptions,
  errors: initialErrors,
};

class EditCollectionForm extends Component {
  static async getInitialProps({ req, query }) {
    if (!query.id) return;

    let collection = {};
    let links = [];
    let allTopics = [];

    const collectionUrl = `${configOptions.hostname}/api/collections/${query.id}`;
    const collectionResp = await axios.get(collectionUrl);

    if (collectionResp.status === 200) {
      collection = collectionResp.data.collectionInfo;
      links = collectionResp.data.links;
      console.log("IN EDIT", collectionResp)
    }

    const allTopicsUrl = `${configOptions.hostname}/api/topics/all`;
    const allTopicsResp = await axios.get(allTopicsUrl);

    if (allTopicsResp.status === 200) {
      allTopics = allTopicsResp.data;
    }

    return {
      collection,
      links,
      allTopics,
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (!isEmpty(prevProps.user.data) && isEmpty(user.data)) {
      Router.push('/login');
    }
  }

  componentDidMount() {
    const { user, allTopics } = this.props;
    if (!user.data || isEmpty(user.data)) {
      Router.push('/login');
    }

    const newTopicOptions = allTopics.map((topic) => ({
      label: topic,
      value: topic,
    }));

    this.setState({
      topicOptions: newTopicOptions,
    });

    if (!isEmpty(this.props.collection)) {
      const { collection, links } = this.props;

      this.setState({
        name: collection.name,
        description: collection.description,
        links,
        collectionId: collection.id,
      });
    }
  }

  state = initialState;

  validateForm = () => {
    const { name, description, errors, links } = this.state;

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

  handleEditCollection = () => {
    this.setState({
      errors: { ...initialErrors },
    });

    const isValid = this.validateForm();

    if (isValid) {
      const { user } = this.props;
      const { name, description, links, collectionId, topicsSelected, permissionSelected } = this.state;
      const topics = topicsSelected.map((topicSelected) => topicSelected.value);

      const payload = {
        name,
        user_id: user.data.id,
        description,
        links,
        collection_id: collectionId,
        topics,
        permission: permissionSelected.value
      }

      this.props.editCollection(payload);
      Router.back();
    }
  }

  handleTopicListChange = (topicList) => {
    this.setState({
      topicsSelected: topicList,
    });
  }

  handlePermissionChanged = (permissionSelected) => {
    this.setState({
      permissionSelected,
    });
  }

  handleDeleteCollection = () => {
    const { collectionId } = this.state;
    this.props.deleteCollection(collectionId);
    Router.push('/my-profile');
  }

  handleRemovelink = (index) => {
    const { links } = this.state;
    const newLinks = [...links];
    newLinks.splice(index, 1);
    this.setState({
      links: newLinks,
    });
  }

  handleAddLink = () => {
    const {links, linkInput, linkDescriptionInput} = this.state;

    const newErrors = { ...this.state.errors };
    let newLinkError = ""

    const linkInputClean = linkInput.trim()
    if (validURL(linkInputClean)) {
      const linkObject = {
        'url': linkInputClean,
        'description': linkDescriptionInput
      }
      const newLinks = [...links, linkObject]
      this.setState({
        links: newLinks
      })
      console.log(this.state)
    }
    else {
      const newErrors = { ...this.state.errors };
      newLinkError = "Link is not a valid URL."
    }

    newErrors.linkInput = newLinkError;
    this.setState({
      linkInput: '',
      errors: newErrors,
    })
  }

  handleGoBack = () => {
    Router.back();
  }

  render() {
    console.log(this.state)

    const {
      name,
      description,
      links,
      linkInput,
      errors,
      topicsSelected,
      topicOptions,
      permissionSelected,
      permissionOptions,
      linkDescriptionInput,
   } = this.state;

    return (
      <div className="create-collection-page">

        <div className="form-with-corner-button">
          <h1>Edit New Collection</h1>
          <button
            className="form-button-outline warning-button"
            onClick={this.handleDeleteCollection}
          >
            Delete Collection
          </button>

        </div>
        <Input
          label="Title"
          value={name}
          placeholder="Collection Title"
          className="form-input-bordered"
          onChange={(event) => this.setState({ name: event.target.value })}
          error={errors.name}
        />
        {
          (topicOptions && topicOptions.length) && (
          <MySelect
            label="Topics"
            value={topicsSelected}
            onChange={this.handleTopicListChange}
            options={topicOptions}
            isMulti
          />
          )
        }
        <MySelect
          label="Permissions"
          value={permissionSelected}
          onChange={this.handlePermissionChanged}
          options={permissionOptions}
        />
        <Textarea
          label="Description"
          value={description}
          placeholder="Type description of collection"
          className="form-textarea"
          onChange={(event) => this.setState({ description: event.target.value })}
          error={errors.description}
        />
        <div className="links-section">
        <Textarea
          label="Collection Links"
          value={linkDescriptionInput}
          placeholder="Type a short description of the link you're adding to this collection..."
          className="form-textarea"
          height={150}
          onChange={(event) => this.setState({ linkDescriptionInput: event.target.value })}
          error={errors.linkDescriptionInput}
          style={{marginBottom: 2, height: 150}}
        />
        <Input
          value={linkInput}
          placeholder="Enter link"
          className="form-input-bordered"
          onChange={(event) => this.setState({ linkInput: event.target.value })}
          error={errors.linkInput}
          buttonClick={this.handleAddLink}
          buttonLabel="Add Link"
          style={{'marginTop': 0}}
        />

        <p className="form-label">Links Added</p>
        {
          links && links.length ? links.map((link, i) => (
            <div className="link">
              <p className="text-sans-serif"><a href={link}>{link.url}</a></p>
              <p className="text-sans-serif text-italic-gray">{link.description}</p>
              <button
                type="submit"
                className="form-button-outline circle-button "
                onClick={() => this.handleRemovelink(i)}
              >
                <img
                  alt="remove"
                  src="static/delete.svg"
                />
              </button>
            </div>
          ))
            : <div className="text-sans-serif">No links right now!</div>
          }
        </div>
        <div className="form-button-group-horizontal">
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleGoBack}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleEditCollection}
          >
            Save Collection
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

EditCollectionForm.propTypes = {
  user: PropTypes.object,
  editCollection: PropTypes.func,
  deleteCollection: PropTypes.func,
  collection: PropTypes.object,
  links: PropTypes.object,
  allTopics: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    editCollection: (payload) => dispatch(editCollectionAction(payload)),
    deleteCollection: (collectionId) => dispatch(deleteCollectionAction(collectionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCollectionForm);
