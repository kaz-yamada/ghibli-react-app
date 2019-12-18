/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { parseIdFromUrl, getById } from '../api/ApiActions';
import { relatedCategories } from '../data/displayFields';
import { capitaliseString } from '../utils/functions';

export default class DetailLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      relatedLinks: {},
    };
  }

  componentDidMount() {
    const { category } = this.props;
    const categories = relatedCategories[category];
    const links = {};

    if (categories.length) {
      categories.forEach(relatedItem => {
        const keyword = relatedItem.keyword || relatedItem.category;
        links[relatedItem.category] = this.getRelatedLinks(relatedItem.category, keyword);
      });
    }

    this.setState({ isLoaded: true, relatedLinks: links });
  }

  getRelatedLinks = (category, keyword) => {
    const { item } = this.props;
    const relatedItems = [];
    let urls = [];

    if (item[keyword] && !Array.isArray(item[keyword])) {
      urls.push(item[keyword]);
    } else {
      urls = item[keyword];
    }

    if (urls) {
      urls.forEach(async url => {
        const id = parseIdFromUrl(url, category);

        if (id && id.length) {
          let data = {};
          const categoryData = sessionStorage.getItem(category);

          if (categoryData === null) {
            const response = await getById(keyword, id);
            data = await response.json();
          } else {
            const list = JSON.parse(categoryData);
            data = list[id];
          }

          relatedItems.push(data);
        }
      });
    }

    return relatedItems;
  };

  displayLinks = () => {
    const { category } = this.props;
    const { relatedLinks } = this.state;
    const relatedCategory = relatedCategories[category];

    if (relatedCategory.length) {
      return relatedCategory
        .filter(item => relatedLinks[item.category].length)
        .map(item => {
          const label = item.label ? item.label : capitaliseString(item.category);

          return (
            <div key={label}>
              <h4>{label}</h4>
              <ul>{this.displayLinkItems(relatedLinks[item.category], item.category)}</ul>
            </div>
          );
        });
    }

    return <p>None</p>;
  };

  displayLinkItems = (items, category) => {
    return items.map(item => {
      const link = `${process.env.PUBLIC_URL}/c/${category}/${item.id}`;

      return (
        <li key={item.id}>
          <Link to={link}>{item.title || item.name}</Link>
        </li>
      );
    });
  };

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        <h3>Related Links</h3>
        {isLoaded ? this.displayLinks() : 'Loading...'}
      </div>
    );
  }
}
