import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import styles from 'styles/RelateCollectionForm.scss';
// import { createNewCollectionAction } from '../src/actions/collections';

const collectionRelationTypes = [
  { value: 'Subcategory', label: 'is a subcategory of' },
  { value: 'Explains', label: 'explains' },
  { value: 'Opposes', label: 'opposes' },
];

class RelateCollectionForm extends Component {
  state = {
    relationshipSelected: '',
    collectionFromSelected: '',
    collectionFromOptions: [],
  }

  componentDidMount() {
    const { globals } = this.props;
    const { collections } = globals;
    const collectionFromOptions = [];
    collections.forEach((collection) => {
      collectionFromOptions.push({
        value: collection.id,
        label: collection.name,
      });
    });
    this.setState({ collectionFromOptions });
  }

  handleRelateCollectionSubmit = () => {
    const url = 'http://127.0.0.1:8000/api/collections/relationship';

    const { collectionFromSelected, relationshipSelected } = this.state;
    const { collectionToObj } = this.props;

    axios.post(url, {
      collectionFrom: collectionFromSelected.value,
      collectionTo: collectionToObj.id,
      relationship: relationshipSelected.value,
    }).then((res) => {
      Router.push(`/collection?id=${collectionFromSelected.value}`);
    });
  }

  handleRelationshipChange = (relationshipSelected) => {
    this.setState({ relationshipSelected });
  }

  handleCollectionFromChange = (collectionFromSelected) => {
    this.setState({ collectionFromSelected });
  }

  render() {
    const { relationshipSelected, collectionFromSelected, collectionFromOptions } = this.state;
    const { collectionToObj } = this.props;
    return (
      <div className="relate-collection-form">
        <p>
          { collectionFromSelected && relationshipSelected && collectionToObj
            ? `Collection Relation: ${collectionFromSelected.label} ${relationshipSelected.label} ${collectionToObj.name}`
            : 'Select the following'
          }
        </p>
        <div className="form-select-wrapper">
          <p className="form-select-label">Relationship</p>
          <div className="form-select">
            <Select
              value={relationshipSelected}
              onChange={this.handleRelationshipChange}
              options={collectionRelationTypes}
            />
          </div>
        </div>
        <div className="form-select-wrapper">
          <p className="form-select-label">Your Collection</p>
          <div className="form-select">
            <Select
              value={collectionFromSelected}
              onChange={this.handleCollectionFromChange}
              options={collectionFromOptions}
            />
          </div>
        </div>
        <div className="form-button-group-horizontal">
          <button
            type="submit"
            className="form-button-outline"
            onClick={this.handleRelateCollectionSubmit}
          >
            Propose Related Collection
          </button>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

RelateCollectionForm.propTypes = {
  globals: PropTypes.object,
  collectionToObj: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});


export default connect(mapStateToProps,)(RelateCollectionForm);
