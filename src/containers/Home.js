import React, { Component } from 'react';
import styles from 'styles/base.scss';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="padded-section">
          <img src="static/puzzles.png" className="logo" alt="puzzle" />
          <h1>Welcome to Paper!</h1>
          <p className="text-sans-serif">We have alot to do.</p>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Home;
