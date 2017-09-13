import React from 'react';
import StyledHeader from '../primitives/StyledHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthentication, logOutUser, getUser } from '../ducks';

import { Link } from 'react-router-dom';

const Header = (props) => {
  const { authenticated, user } = props;

  const handleLogout = () => {
    const { logOutUser } = props;
    logOutUser();
  };

  return (
    <StyledHeader>
      <div style={{
        padding: '.5rem',
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          textDecoration: 'none',
          height: '30px',
          margin: '1rem 0',
          color: '#fff',
          fontWeight: '800',
        }}>New/JS</Link>
        <ul style={{
          listStyle: 'none',
          display: 'inline-block',
          paddingLeft: '1rem',
        }}>
          <li style={{
            display: 'inline-block',
            color: 'white',
          }}><Link to="/" style={{
            color: 'white',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginRight: '1rem',
            fontWeight: '200',
          }}>Latest</Link></li>
          <li style={{
            display: 'inline-block',
            color: 'white',
          }}><Link style={{
            color: 'white',
            fontSize: '1.2rem',
            textDecoration: 'none',
            marginRight: '1rem',
            fontWeight: '200',
          }} to="/submit">Top</Link></li>
        </ul>
      </div>
      <div style={{
        align: 'flex-end',
        padding: '1.5rem',
        fontSize: '.9rem',
        color: '#fff',
      }}>
        {authenticated && user}
        <Link to="/submit" style={{
          background: '#fff',
          border: '0',
          padding: '.5rem 1rem',
          fontSize: '.9rem',
          marginLeft: '1rem',
        }}>Add story</Link>
        {authenticated && (
          <button style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '.9rem',
            textDecoration: 'underline',
            marginLeft: '1rem',
          }} onClick={handleLogout}>Logout</button>
        )}
      </div>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => ({
  authenticated: getAuthentication(state),
  user: getUser(state),
});

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  logOutUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
