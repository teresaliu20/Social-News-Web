import React, { Component } from 'react';
import styles from 'styles/Header.scss';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Paper!</h1>
        <p className="text-sans-serif">This is your profile.</p>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Profile;
