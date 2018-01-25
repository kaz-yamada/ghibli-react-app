import axios from 'axios';

const apiUrl = 'https://ghibliapi.herokuapp.com/';

export function fetchItems(endpoint) {
	return axios.get(apiUrl + endpoint);	
}
