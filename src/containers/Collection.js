import React, { Component } from 'react';
import styles from 'styles/Collection.scss';

// TODO: take this out later when not hardcoded
const collection = {
  title: 'Title',
  description: 'Description',
  links: [
    {
      link: 'www.google.com',
      description: 'yeah its just google',
    },
    {
      link: 'www.google.com',
      description: 'yeah its just google',
    },
    {
      link: 'www.google.com',
      description: 'yeah its just google',
    },
    {
      link: 'www.google.com',
      description: 'yeah its just google',
    },
    {
      link: 'www.google.com',
      description: 'yeah its just google',
    },
  ],
};

class Collection extends Component {
  render() {
    // const { collection } = this.props;

    return (
      <div className="collection-page">
        <div className="padded-section">
          <h1>{collection.title}</h1>
          <p className="text-sans-serif">{collection.description}</p>
          <div className="links-section">
            {
            collection.links.map((linkObj) => (
              <div className="link">
                <p>{linkObj.description}</p>
                <a href={linkObj.link}>{linkObj.link}</a>
              </div>
            ))
          }
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

// TODO: gotta get the original collection first
// Collection.getInitialProps = async ({ query }) => {
//   const res = await getPost(query.slug)
//   const json = await res.json()
//   return { post: json[0] }
// }

export default Collection;
