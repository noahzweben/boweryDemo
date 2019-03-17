/* Util method for onChange method of form inputs */
let inputChange = function(e){
	if (!this.setState){
		throw("You must bind inputChange with your state");
	}
	let name = e.target.name;
	let value = e.target.value;
	this.setState({[name]: value});
}

export default inputChange;