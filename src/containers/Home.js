import React, { Component } from 'react';
import styles from 'styles/Header.scss';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Paper!</h1>
        <p className="text-sans-serif">We have alot to do.</p>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Home;
