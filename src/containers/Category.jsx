import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getCategoryItems } from '../api/ApiActions';

import CategoryList from '../components/CategoryList';

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      isLoaded: false,
      listItems: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.fetchCategoryItems(match.params.category);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.category !== state.currentCategory) {
      return {
        isLoaded: false,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match.params.category !== prevProps.match.params.category) {
      this.fetchCategoryItems(match.params.category);
    }
  }

  async fetchCategoryItems(category) {
    const sessionData = sessionStorage.getItem(category);
    let data = {};

    if (sessionData === null) {
      try {
        const response = await getCategoryItems(category);
        data = await response.json();

        data = data.reduce((obj, item) => {
          const temp = obj;
          temp[item.id] = item;
          return obj;
        }, {});

        sessionStorage.setItem(category, JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }
    } else {
      data = JSON.parse(sessionData);
    }

    this.setState({
      currentCategory: category,
      listItems: data,
      isLoaded: true,
    });
  }

  render() {
    const { isLoaded } = this.state;
    const { match } = this.props;

    if (!isLoaded) {
      return <p>loading...</p>;
    }

    const { listItems, currentCategory } = this.state;

    return (
      <div>
        <CategoryList category={currentCategory} list={listItems} url={match.url} />
      </div>
    );
  }
}

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
