import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header>
    <img src="/static/next-logo.png" alt="logo" />
    <h3>nextjs redux starter</h3>
    <menu>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/">
        <a>Redux demo</a>
      </Link>
    </menu>
  </header>
);

export default Header;
