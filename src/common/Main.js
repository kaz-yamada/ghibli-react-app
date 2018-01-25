import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Characters from 'categories/Characters';
import Films from 'categories/Films';
import Locations from 'categories/Locations';
import Species from 'categories/Species';
import Vehicles from 'categories/Vehicles';

export default class Main extends Component {
	render() {
		return (
			<main>
				<Switch>
					<Route exact path="/" component={Films} />
					<Route path="/films" component={Films} />
					<Route path="/characters" component={Characters} />
					<Route path="/locations" component={Locations} />
					<Route path="/species" component={Species} />
					<Route path="/vehicles" component={Vehicles} />
				</Switch>
			</main>
		);
	}
}
