import React from 'react';
import Link from 'next/link';
import styles from 'styles/Header.scss';

const Header = () => (
  <header className="header">
    <Link href="/">
      <h3>Paper</h3>
    </Link>
    <menu className="menu">
      <Link href="/">
        <div className="menu-item">
          <a>Home</a>
        </div>
      </Link>
    </menu>
    <style jsx>{styles}</style>
  </header>
);

export default Header;
