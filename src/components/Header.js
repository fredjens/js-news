import React from 'react';
import StyledHeader from '../primitives/StyledHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthentication, logOutUser } from '../ducks';

import { Link } from 'react-router-dom';

const Header = (props) => {
  const { authenticated } = props;

  const handleLogout = () => {
    const { logOutUser } = props;
    logOutUser();
  };

  return (
    <StyledHeader>
      <ul>
        <li><Link to="/">Latest</Link></li>
        <li><Link to="/submit">Submit</Link></li>
      </ul>
      <div>
        {authenticated ? 'authenticated' : 'unauthorized'}
        {authenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => ({
  authenticated: getAuthentication(state),
});

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  logOutUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
