import React, { Component } from 'react';
import { Row, Jumbotron } from 'reactstrap';

import { fetchItems } from 'APIactions';
import ListItem from 'common/ListItem';

export default class Locations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			locations: []
		};
	}

	locationInfo(location) {
		return (
			<ul>
				<li>Climate: {location.climate}</li>
				<li>Terrain: {location.terrain}</li>
				<li>Surface Water: {location.surface_water}</li>
			</ul>
		);
	}

	componentDidMount() {
		console.log('Loading locations...');
		fetchItems('locations')
			.then(response => {
				this.setState({
					isLoaded: true,
					locations: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		if (!this.state.isLoaded) {
			return <p>loading locations...</p>;
		}

		return (
			<div>
				<Jumbotron>
					<h1>Vehicles</h1>
					<p>Locations that appear in films by Studio Ghilbi</p>
				</Jumbotron>
				<Row className="locations cards-list">
					{this.state.locations.map(location => {
						return (
							<ListItem
								key={location.id}
								type="location"
								title={location.name}
								text={this.locationInfo(location)}
							/>
						);
					})}
				</Row>
			</div>
		);
	}
}
