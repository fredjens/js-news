import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';

import {
  getAuthentication,
  signInUser,
  logOutUser,
  getUsernameById,
} from '../ducks';

import StyledHeader, { StyledHeaderRight } from '../primitives/StyledHeader';
import Logo from '../primitives/Logo';
import Navigation, { NavigationLink } from '../primitives/Navigation';
import StyledButton from '../primitives/StyledButton';
import LoginDrawer from '../primitives/LoginDrawer';

import GithubLogo from '../assets/github.png';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showLogin: false,
    };
  }

  handleLogout = () => {
    const { logOutUser, history} = this.props;
    logOutUser();
    history.push('/');

  };

  handleAddStory() {
    const { history, authenticated } = this.props;
    const { showLogin } = this.state;

    if (!authenticated) {
      return this.setState({ showLogin: !showLogin });
    }

    history.push('submit');
  }

  handleSignInUser() {
    const { signInUser, history } = this.props;

    signInUser();

    this.setState({ showLogin: false });
    history.push('submit');
  };

  render() {
    const { showLogin } = this.state;
    const { authenticated, user } = this.props;

    const userInfo = (
      <Link to="submit">
        {user}
      </Link>
    );

    const login = (
      <LoginDrawer>
        <h2>Hi! You need to sign in to add stories</h2>
        <StyledButton
          white
          onClick={this.handleSignInUser}
        >
          <img src={GithubLogo} alt="Github logo" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />
          Signup/Login with Github
        </StyledButton>
      </LoginDrawer>
    );

    return (
      <div>
        <StyledHeader>
          <Logo to="/">New/JS</Logo>
          <Navigation>
            <NavigationLink to="/">Latest</NavigationLink>
            <NavigationLink to="/">Top</NavigationLink>
          </Navigation>
          <StyledHeaderRight>
            {authenticated && userInfo}
            <StyledButton
              onClick={this.handleAddStory}
            > Add story
            </StyledButton>
            {authenticated && (
              <StyledButton
                white
                onClick={this.handleLogout}
              >Logout</StyledButton>
            )}
          </StyledHeaderRight>
        </StyledHeader>
        {showLogin && login}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { user: id = ''} = state;

  return ({
    authenticated: getAuthentication(state),
    user: getUsernameById(state, id),
  });
};

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  logOutUser,
  signInUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
