import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from 'styles/UserPreview.scss';

const UserPreview = ({ user }) => {
  return (
    <div>
      <Link href={`/profile?id=${user.id}`} key={user.id}>
        <div className="user-item clickable">
          <h3 className="name">{`${user.first_name} ${user.last_name}`}</h3>
          <p className="text-sans-serif text-light-gray username">
            @
            {user.username}
          </p>
        </div>
      </Link>
      <style jsx>{styles}</style>
    </div>
  );
};

UserPreview.propTypes = {
  user: PropTypes.object,
};

export default UserPreview;
