import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Navigation extends Component {
	render() {
		return (
			<Navbar className="ml-auto">
				<NavbarBrand>Ghibli React App</NavbarBrand>
				<Nav>
					<NavItem>
						<NavLink to="/Characters" tag={Link}>
							Characters
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/Films" tag={Link}>
							Films
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/Locations" tag={Link}>
							Locations
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/Species" tag={Link}>
							Species
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/Vehicles" tag={Link}>
							Vehicles
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
