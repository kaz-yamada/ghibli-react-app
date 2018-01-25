import React, { Component } from 'react';
import { Row, Jumbotron } from 'reactstrap';

import { fetchItems } from 'APIactions';
import ListItem from 'common/ListItem';

export default class Characters extends Component {
	constructor(props) {
		super();
		this.state = {
			isLoaded: false,
			characters: []
		};
	}

	characterInfo(character) {
		return (
			<ul>
				<li>Gender: {character.gender}</li>
				<li>Age: {character.age}</li>
				<li>Eye Color: {character.eye_color}</li>
				<li>Hair Color: {character.hair_color}</li>
			</ul>
		);
	}

	componentDidMount() {
		console.log('Loading characters...');
		fetchItems('people')
			.then(response => {
				this.setState({
					isLoaded: true,
					characters: response.data
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
					<h1>Characters</h1>
					<p>List of characters that appear in films by Studio Ghilbi</p>
				</Jumbotron>
				<Row className="characters cards-list">
					{this.state.characters.map(character => {
						return (
							<ListItem
								key={character.id}
								title={character.name}
								text={this.characterInfo(character)}
							/>
						);
					})}
				</Row>
			</div>
		);
	}
}
