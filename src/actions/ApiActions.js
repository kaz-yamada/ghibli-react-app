import axios from 'axios';

const apiUrl = 'https://ghibliapi.herokuapp.com/';
const categoryLinks = {
	films: false,
	people: ['films', 'species'],
	locations: ['residents', 'films'],
	species: ['people', 'films'],
	vehicles: ['pilot', 'films']
};

/**
 * Makes a GET request to the Ghibli API
 * to get all items in the category
 *
 * @param {string} category
 */
export function getCategoryItems(category) {
	return axios.get(apiUrl + category);
}

/**
 * Call API by id
 *
 * @param {string} category
 * @param {int64} id
 */
export function getById(category, id) {
	return axios.get(`${apiUrl}${category}/${id}`);
}

export function isEmpty(obj) {
	if (typeof obj !== 'object') return false;

	if (Object.getOwnPropertyNames(obj).length === 0) {
		return true;
	}
	return false;
}

/**
 * Loops through a single category item's related fields
 *
 * @param {Object} item A single object from a category.
 * @param {string} mainCategory The category the item belongs to.
 * @return {Array} Array of objccts consisting of the related category and .
 */
export function getLinkedCategories(item, mainCategory) {
	// Get the calling category's related fields
	const relatedCategories = categoryLinks[mainCategory];

	console.log();

	if (isEmpty(relatedCategories) || !relatedCategories) {
		return false;
	}

	return relatedCategories.map(rel => {
		const urls = item[rel];
		let promises = [];

		if (typeof urls === 'string') {
			promises.push(axios.get(urls));
		} else {
			promises = urls.map(url => {
				return axios.get(url);
			});
		}

		return {
			category: rel,
			promises: axios.all(promises)
		};
	});
}

/**
 *
 * @param {*} item
 * @param {*} mainCategory
 */
export function getAllRelated(item, mainCategory) {
	const relatedCategories = categoryLinks[mainCategory];
	let promiseArray = [];
	relatedCategories.forEach(relatedCategory => {
		const urls = item[relatedCategory];
		if (typeof urls === 'string') {
			promiseArray.push(axios.get(urls));
		} else {
			urls.forEach(url => {
				promiseArray.push(axios.get(url));
			});
		}
	});

	return axios.all(promiseArray);
}
