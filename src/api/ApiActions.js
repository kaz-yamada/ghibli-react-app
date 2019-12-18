const apiUrl = 'https://ghibliapi.herokuapp.com/';
const categoryLinks = {
  films: false,
  people: ['films', 'species'],
  locations: ['residents', 'films'],
  species: ['people', 'films'],
  vehicles: ['pilot', 'films'],
};

/**
 * Makes a GET request to the Ghibli API
 * to get all items in the category
 *
 * @param {string} category
 */
export function getCategoryItems(category) {
  return fetch(apiUrl + category);
}

/**
 * Call API by id
 *
 * @param {string} category
 * @param {int64} id
 */
export function getById(category, id) {
  return fetch(`${apiUrl}${category}/${id}`);
}

export function isEmpty(obj) {
  if (typeof obj !== 'object') return false;

  if (Object.getOwnPropertyNames(obj).length === 0) {
    return true;
  }
  return false;
}

export function parseIdFromUrl(url, category) {
  if (category) {
    return url.replace(`${apiUrl + category}/`, '');
  }

  return false;
}

/**
 *
 * @param {*} item
 * @param {*} mainCategory
 */
export function getAllRelated(item, mainCategory) {
  const relatedCategories = categoryLinks[mainCategory];
  const promiseArray = [];
  relatedCategories.forEach(relatedCategory => {
    const urls = item[relatedCategory];
    if (typeof urls === 'string') {
      promiseArray.push(fetch(urls));
    } else {
      urls.forEach(url => {
        promiseArray.push(fetch(url));
      });
    }
  });

  return fetch(promiseArray);
}
