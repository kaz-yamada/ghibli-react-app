import React, { Component } from 'react';
import { Col, Card, CardTitle, CardText } from 'reactstrap';

export default class ListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title,
			text: this.props.text
		};
	}

	render() {
		return (
			<Col xs="12" md="6" lg="4">
				<Card className="h-100 card-body">
					<CardTitle>{this.props.title}</CardTitle>
					<CardText tag="div">{this.props.text}</CardText>
				</Card>
			</Col>
		);
	}
}
