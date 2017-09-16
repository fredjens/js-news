import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import Submit from '../containers/Submit';

import {
  getAuthentication,
  signInUser,
  logOutUser,
  getUsernameById,
} from '../ducks';

import StyledHeader, { StyledHeaderRight } from '../primitives/StyledHeader';
import Logo from '../primitives/Logo';
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
    const { logOutUser } = this.props;
    logOutUser();
  };

  handleAddStory() {
    const { showLogin } = this.state;

    return this.setState({ showLogin: !showLogin });
  }

  handleSignInUser() {
    const { signInUser } = this.props;

    signInUser();
  };

  render() {
    const { showLogin } = this.state;
    const { authenticated, user } = this.props;

    const userInfo = (
      <span style={{
        marginRight: '1rem',
      }}>
        {user}
      </span>
    );

    const login = (
      <LoginDrawer>
        <h2 style={{
          color: '#fff',
          marginBottom: '1rem',
        }}>You need to sign in to add stories</h2>
        <StyledButton
          white
          onClick={this.handleSignInUser}
        >
          <img src={GithubLogo} alt="Github logo" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />
          Signup with Github
        </StyledButton>
      </LoginDrawer>
    );

    return (
      <div>
        <StyledHeader>
          <Logo to="/">
            <StyledButton>↓ Top</StyledButton>
            JS
          </Logo>
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
        {showLogin && !authenticated && login}
        {showLogin && authenticated && (
          <Submit
            onClose={() => this.setState({ showLogin: false })}
          />
        )}
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
