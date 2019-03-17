import { fakeDB } from './data/data.js';

//spoofing a 1 millisecond API response
const API_TIME = 1;

//"Loads" data for first time in app
if (!localStorage.getItem('plant_data')) {
	localStorage.setItem('plant_data', JSON.stringify(fakeDB));
}

/*
A helper class that spoofs an API. Simulates a few get/posts.
*/
class ApiMock {
	static getPlantTypes() {
		let plantTypes = ['arugula', 'kale', 'romaine', 'spinach'];
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(plantTypes), API_TIME);
		});
	}

	//gets n most recent plant photos
	static getRecentPlants(n) {
		return new Promise((resolve, reject) => {
			let data = JSON.parse(localStorage.getItem('plant_data'));
			data = data
				.sort((a, b) => new Date(b.date) - new Date(a.date))
				.slice(0, n);
			setTimeout(() => resolve(data), API_TIME);
		});
	}

	//get plants given a search query
	static getPlants(q) {
		return new Promise((resolve, reject) => {
			let data = JSON.parse(localStorage.getItem('plant_data'));
			if (q.type) {
				data = data.filter(d => d.type === q.type);
			}
			if (q.age) {
				data = data.filter(d => d.age === parseInt(q.age));
			}
			//most recent first
			data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
			setTimeout(() => resolve(data), API_TIME);
		});
	}

	//returns specific plant
	static getDetail(id) {
		return new Promise((resolve, reject) => {
			let data = JSON.parse(localStorage.getItem('plant_data'));
			let item = data.find(p => p.id === parseInt(id));
			console.log('h', id, item);
			setTimeout(() => resolve(item), API_TIME);
		});
	}


	//creates a new plant
	static postPlant(body) {
		return new Promise((resolve, reject) => {
			let data = JSON.parse(localStorage.getItem('plant_data'));
			let id = data.length;
			body.id = id;
			data.push(body);
			localStorage.setItem('plant_data', JSON.stringify(data));
			setTimeout(() => resolve(body.id), API_TIME);
		});
	}
}

export default ApiMock;
