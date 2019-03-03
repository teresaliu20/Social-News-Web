import React from 'react';
import Link from 'next/link';
import styles from 'styles/Header.scss';

const Header = () => (
  <header className="header">
    <Link href="/">
      <h3>Paper</h3>
    </Link>
    <menu className="menu">
      <Link href="/login">
        <div className="menu-item">
          <a>Login</a>
        </div>
      </Link>
      <Link href="/signup">
        <div className="menu-item">
          <a>Signup</a>
        </div>
      </Link>
      <Link href="/profile">
        <div className="menu-item">
          <a>Profile</a>
        </div>
      </Link>
    </menu>
    <style jsx>{styles}</style>
  </header>
);

export default Header;
