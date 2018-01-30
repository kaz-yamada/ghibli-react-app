import axios from 'axios';

const apiUrl = 'https://ghibliapi.herokuapp.com/';

export function getCategoryItems(endpoint) {
	return axios.get(apiUrl + endpoint);
}

export function getTextDisplay(category) {}
