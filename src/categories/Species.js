import React, { Component } from 'react';
import { Row, Jumbotron } from 'reactstrap';

import { fetchItems } from 'APIactions';
import ListItem from 'common/ListItem';

export default class Species extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			species: []
		};
	}

	speciesInfo(species) {
		return (
			<ul>
				<li>Classification: {species.classification}</li>
				<li>Eye Colors: {species.eye_colors}</li>
				<li>Hair Color: {species.hair_colors}</li>
			</ul>
		);
	}

	componentDidMount() {
		console.log('Loading species...');
		fetchItems('species')
			.then(response => {
				this.setState({
					isLoaded: true,
					species: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		if (!this.state.isLoaded) {
			return <p>loading...</p>;
		}

		return (
			<div>
				<Jumbotron>
					<h1>Vehicles</h1>
					<p>List of species that appear in films by Studio Ghilbi</p>
				</Jumbotron>
				<Row className="species cards-list">
					{this.state.species.map(species => {
						return (
							<ListItem
								key={species.id}
								title={species.name}
								text={this.speciesInfo(species)}
							/>
						);
					})}
				</Row>
			</div>
		);
	}
}
