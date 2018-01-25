import React, { Component } from 'react';
import { Row, Jumbotron } from 'reactstrap';

import { fetchItems } from 'APIactions';
import ListItem from 'common/ListItem';

export default class Films extends Component {
	constructor(props) {
		super();
		this.state = {
			isLoaded: false,
			films: []
		};
	}

	filmsInfo(film) {
		return (
			<div>
				<b>Released: {film.release_date}</b>
				<p>{film.description}</p>
			</div>
		);
	}

	componentDidMount() {
		console.log('Loading films...');
		fetchItems('films')
			.then(response => {
				this.setState({
					isLoaded: true,
					films: response.data
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
					<h1>Films</h1>
					<p>List of films created by Studio Ghilbi</p>
				</Jumbotron>
				<Row className="films cards-list">
					{this.state.films.map(film => {
						return (
							<ListItem
								key={film.id}
								title={film.title}
								text={this.filmsInfo(film)}
							/>
						);
					})}
				</Row>
			</div>
		);
	}
}
