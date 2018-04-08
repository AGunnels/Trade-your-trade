import axios from 'axios';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';
 import "./Navbar.css";
 import LoginModal, {RegisterModal} from '../LoginModal'
 import { withUser, update } from '../../utils/withUser';
 import ApiContext from '../ApiContext'

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  homeClicked = () => {
    this.props.history.push("/")
  }

  handleLogout = event => {
    axios({
      url: '/api/auth',
      method: 'delete',
    })
    .then(() => update(null));
  }

  renderPresence(user) {
    if (user) {
      return (
        <Fragment>
          <NavItem className="navbar-text">
            <span className="welcome-text">Welcome, {user.username}</span>
          </NavItem>
          <NavItem className="navbar-text" onClick={this.handleLogout}>
              Log Out
          </NavItem>
        </Fragment>
      );

    } else {
      return (
        <Fragment>
          <NavItem className="mr-1">
            <LoginModal />
          </NavItem>
          <NavItem>
            <RegisterModal />
          </NavItem>
        </Fragment>
      );
    }
  }



  render() {
    return (
      <div className="navbar-main">
        <Navbar color="faded" light expand="md">
          <NavbarBrand className="navbar-title navbar-text" onClick={this.homeClicked}>Trade Your Trade</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              <ApiContext.Consumer>
                {(globalState) => {
                  // Subscribes to globalState.user property to conditional render navlinks for
                  //  {login,register,profile}
                  const {user} = globalState;
                  return (
                    <Nav className="ml-auto" navbar>
                      {this.renderPresence(user)}
                      <NavItem>
                        <NavLink className="navbar-text" href="/helpwanted">
                          Help Wanted
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="navbar-text" href="/SearchPage">
                            Search
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        {user && 
                          <NavLink className="navbar-text" id="navbar-text" href="/ProfilePage">
                            Profile
                          </NavLink>
                        }
                      </NavItem>
                    </Nav>
                  )
                }}
              </ApiContext.Consumer>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(withUser(MyNavbar));