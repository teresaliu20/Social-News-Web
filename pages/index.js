import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CollectionCard from '../src/components/CollectionCard';
import styles from '../src/styles/Home.scss';
import config from '../src/config';

const configOptions = config[process.env.NODE_ENV || 'development'];


class Home extends Component {
  static async getInitialProps({ req, query }) {
    let allTopics = [];

    const allTopicsUrl = `${configOptions.hostname}/api/topics/all`;
    const allTopicsResp = await axios.get(allTopicsUrl);

    if (allTopicsResp.status === 200) {
      allTopics = allTopicsResp.data;
    }

    const topicCollectionPromises = allTopics.map((topicName) => {
      const allTopicCollectionsUrl = `${configOptions.hostname}/api/topic/${topicName}`;
      return axios.get(allTopicCollectionsUrl);
    });

    const topicsWithCollections = [];
    console.log(allTopics);

    await Promise.all(topicCollectionPromises)
      .then((topicCollectionResps) => {
        topicCollectionResps.map((resp, i) => {
          topicsWithCollections.push({
            topicName: allTopics[i],
            collections: resp.data.collections,
          });
        });
      });


    console.log(topicsWithCollections);
    return {
      topicsWithCollections,
    };
  }

  render() {
    const { topicsWithCollections } = this.props;
    return (
      <div className="home-page">
        <div className="padded-section">
          <h1>
              Welcome to Paper!
            <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-sans-serif">We are a platform for curating meaningful content and different perspectives and ideas. Through collections that you create, you can make share your interests and relate them to other collections.</p>
          <div className="spacing" />
          <h2>Explore Topics</h2>
        </div>
        <div>
          {
            topicsWithCollections && topicsWithCollections.map((topicWithCollection) => (
              <div className="topic-row">
                <div className="padded-section">
                  <hr className="hr" />
                  <Link href={`/topic?name=${topicWithCollection.topicName}`}>
                    <div>
                      <h2 className="highlight clickable">#
                        {topicWithCollection.topicName}
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="topic-carousel">
                  {
                    topicWithCollection.collections.map((collection) => {
                      return (
                        <CollectionCard
                          key={collection.id}
                          collection={collection}
                        />
                      );
                    })
                  }
                  {
                    topicWithCollection.collections.map((collection) => {
                      return (
                        <CollectionCard
                          key={collection.id}
                          collection={collection}
                        />
                      );
                    })
                  }
                  {
                    topicWithCollection.collections.map((collection) => {
                      return (
                        <CollectionCard
                          key={collection.id}
                          collection={collection}
                        />
                      );
                    })
                  }
                </div>
              </div>
            ))
          }
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Home;
