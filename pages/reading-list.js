import React, { Component } from 'react';
import styles from 'styles/Collection.scss';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Input from '../src/components/Input';
import LinksSection from '../src/components/LinksSection';
import RelateCollectionForm from '../src/components/RelateCollectionForm';


class ReadingList extends Component {
  static async getInitialProps({ req, query }) {

  }

  componentWillMount = async () => {
    const { user } = this.props.globals;
    const getReadingListUrl = `http://127.0.0.1:8000/api/users/${user.id}/reading-list`;
    const readingListResp = await axios.get(getReadingListUrl);

    if (readingListResp.status === 200 && readingListResp.data) {
      const links = readingListResp.data;
      this.setState({
        links,
      });
    }
  }

  state = {
    links: [],
    linkInput: '',
  }

  handleAddLink = async () => {
    const { user } = this.props.globals;
    const { linkInput } = this.state;
    const postReadingListUrl = 'http://127.0.0.1:8000/api/users/reading-list';
    const postLinkResp = await axios.post(postReadingListUrl, {
      user_id: user.id,
      url: linkInput,
    });

    if (postLinkResp.status === 200 && postLinkResp.data) {
      const newLink = postLinkResp.data;
      const links = [...this.state.links, newLink];
      this.setState({
        links,
        linkInput: '',
      });
    }
  }

  handleDeleteLink = async (linkId) => {

    const { user } = this.props.globals;
    const { linkInput } = this.state;
    const postReadingListUrl = 'http://127.0.0.1:8000/api/users/reading-list';
    const postLinkResp = await axios.delete(postReadingListUrl, {
      data: {
        link_id: linkId,
      },
    });

    const links = [...this.state.links];

    const oldLinkIndex = links.findIndex((link) => {
      return link.id === linkId;
    });

    links.splice(oldLinkIndex, 1);

    this.setState({
      links,
    });
  }

  render() {
    const { links, linkInput } = this.state;

    return (
      <div className="collection-page">
        <div className="padded-section">
          <h1>Reading List</h1>
          <div className="links-section">
            <LinksSection
              links={links}
              handleDeleteLink={this.handleDeleteLink}
            />
          </div>
          <div className="form-with-corner-button">
            <h3>Add to reading list</h3>
            <button
              type="submit"
              className="form-button-outline"
              onClick={this.handleAddLink}
            >
            Add Link
            </button>
            <Input
              value={linkInput}
              placeholder="Enter link"
              className="form-input"
              onChange={(event) => this.setState({ linkInput: event.target.value })}
            />
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

ReadingList.propTypes = {
  globals: PropTypes.object,
};

const mapStateToProps = (state) => ({
  globals: state,
});


export default connect(mapStateToProps)(ReadingList);
