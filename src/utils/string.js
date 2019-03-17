/* util methods for formatting strings */
export const capitalizeFirst = str =>
	str ? str.charAt(0).toUpperCase() + str.slice(1) : '';


export const ageString = age => `${age} week${age == 1 ? '' : 's'}`;

const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};
export const dateString = date => {
	let d = new Date(date);
	return d.toLocaleDateString('en-US', options);
};
