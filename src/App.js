import React, { Component } from 'react';
import { Container } from 'reactstrap';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import Main from 'components/Main';
import Navigation from 'components/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/App.css';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Container fluid>
					<Navigation />
					<Container>
						<Main />
					</Container>
				</Container>
			</BrowserRouter>
		);
	}
}
