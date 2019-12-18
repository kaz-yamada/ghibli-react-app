import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Jumbotron, Card, CardTitle, CardText } from 'reactstrap';
import { Link, Route } from 'react-router-dom';

import Detail from '../containers/Detail';
import CategoryText from './DetailText';
import { capitaliseString } from '../utils/functions';

export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: {},
    };
  }

  displayJumbotron = category => {
    const title = capitaliseString(category);
    return (
      <Jumbotron>
        <h1>{title}</h1>
      </Jumbotron>
    );
  };

  displayCard = item => {
    const { category } = this.props;
    const detailsLink = `${process.env.PUBLIC_URL}/c/${category}/${item.id}`;

    return (
      <Col xs="12" md="6" lg="4" key={item.id}>
        <Card className="h-100 card-body">
          <CardTitle>
            <h2>{item.name || item.title}</h2>
          </CardTitle>
          <CardText tag="div">
            <CategoryText item={item} category={category} excerpt />
          </CardText>
          <Link to={detailsLink}>More Info</Link>
        </Card>
      </Col>
    );
  };

  render() {
    const { category, list, url } = this.props;
    const { currentItem } = this.state;

    return (
      <div className="list-wrapper">
        {this.displayJumbotron(category)}
        <Row className="category-list">
          {Object.keys(list).map(key => {
            return this.displayCard(list[key]);
          })}
        </Row>
        <Route
          path={`${url}/:id`}
          render={routeProps => (
            <Detail routeProps={routeProps} item={currentItem} category={category} />
          )}
        />
      </div>
    );
  }
}

CategoryList.propTypes = {
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  //   list: PropTypes.
};
