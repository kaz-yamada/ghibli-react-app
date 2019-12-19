/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getCategoryItems } from '../api/ApiActions';

import CategoryList from '../components/CategoryList';
import { categoryLabels } from '../data/displayFields';

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: '',
      isLoaded: false,
      listItems: {},
    };

    this.fetchCategoryItems = this.fetchCategoryItems.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { category } = match.params;

    this.fetchCategoryItems(category);
  }

  static getDerivedStateFromProps(props, state) {
    const { category } = props.match.params;
    if (category !== state.currentCategory) return { isLoaded: false };

    return { isLoaded: true };
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match.params.category !== match.params.category) {
      this.fetchCategoryItems(match.params.category);
    }
  }

  async fetchCategoryItems(category) {
    if (categoryLabels[category]) {
      const sessionData = sessionStorage.getItem(category);
      let data = {};

      if (sessionData === null) {
        try {
          let response = await getCategoryItems(category);
          response = await response.json();

          data = response.reduce((obj, item) => {
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
        isLoaded: true,
        listItems: data,
        currentCategory: category,
      });
    }
  }

  render() {
    const { match } = this.props;
    const { currentCategory, isLoaded, listItems } = this.state;

    if (!isLoaded) {
      return <p>loading...</p>;
    }

    if (Object.keys(listItems).length === 0) {
      return <div>Invalid Category</div>;
    }

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
