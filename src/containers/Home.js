import React, { Component } from 'react';
import styles from 'styles/base.scss';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="padded-section">
          <h1>
              Welcome to Paper!
            <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-sans-serif">We are a platform for curating meaningful content and different perspectives and ideas. Through collections that you create, you can make share your interests and relate them to other collections.</p>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Home;
