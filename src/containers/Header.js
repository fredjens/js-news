import React, { Component } from 'react';
import StyledHeader from '../primitives/StyledHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

import { getAuthentication, logOutUser, getUsernameById } from '../ducks';

import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleLogout = () => {
    const { logOutUser } = this.props;
    logOutUser();
  };

  handleAddStory() {
    const { history, authenticated } = this.props;

    if (!authenticated) {
      return history.push('login');
    }

    return history.push('submit');
  }

  render() {
    const { authenticated, user } = this.props;

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
              fontSize: '1.2rem',
              textDecoration: 'none',
              marginRight: '1rem',
              fontWeight: '200',
            }}>Latest</Link></li>
            <li style={{
              display: 'inline-block',
            }}><Link to="/" style={{
              fontSize: '1.2rem',
              textDecoration: 'none',
              marginRight: '1rem',
              fontWeight: '200',
            }}>Top</Link></li>
          </ul>
        </div>
        <div style={{
          align: 'flex-end',
          padding: '1.5rem',
          fontSize: '.9rem',
        }}>
          {authenticated && (
            <Link to="submit">
              {user}
            </Link>
          )}
          <button onClick={this.handleAddStory} style={{
            background: '#3397d0',
            color: '#fff',
            border: '0',
            padding: '.5rem 1rem',
            fontSize: '.9rem',
            marginLeft: '1rem',
          }}>Add story</button>
          {authenticated && (
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '.9rem',
              textDecoration: 'underline',
              marginLeft: '1rem',
            }} onClick={this.handleLogout}>Logout</button>
          )}
        </div>
      </StyledHeader>
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
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
