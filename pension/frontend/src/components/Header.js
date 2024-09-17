import React from 'react';

const Header = ({ userType, setUserType }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Enhanced Pension Fund</h1>
        <nav>
          <button
            onClick={() => setUserType('user')}
            className={userType === 'user' ? 'active' : ''}
          >
            User
          </button>
          <button
            onClick={() => setUserType('employer')}
            className={userType === 'employer' ? 'active' : ''}
          >
            Employer
          </button>
          <button
            onClick={() => setUserType('admin')}
            className={userType === 'admin' ? 'active' : ''}
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
