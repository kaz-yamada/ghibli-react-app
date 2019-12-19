import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';

const routeList = [
  { url: 'films', label: 'Films' },
  { url: 'locations', label: 'Locations' },
  { url: 'people', label: 'People' },
  { url: 'species', label: 'Species' },
  { url: 'vehicles', label: 'Vehicles' },
];

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  /**
   * Hide or show the header navigation.
   */
  toggleNavbar = () => {
    this.setState(prevState => {
      return { collapsed: !prevState.collapsed };
    });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Navbar className="navbar-expand-lg" light>
        <NavbarBrand tag="div">
          <NavLink to="/">Ghibli React App</NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav>
            {routeList.map(navItem => (
              <NavItem key={navItem.label}>
                <NavLink to={`/c/${navItem.url}`} activeClassName="active" className="nav-link">
                  {navItem.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
