import React from 'react';
import ApiMock from 'apiMock/ApiMock.js';
import { capitalizeFirst } from 'utils/string.js';
import inputChange from 'utils/inputChange.js';
import history from 'utils/history.js';

/*
Reusable search form component to search plants
by age and date
*/
class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			age: '',
			type: '',
			description: '',
			api_types: null
		};

		this.inputChange = inputChange.bind(this);
	}

	componentDidMount() {
		ApiMock.getPlantTypes().then(resp => {
			this.setState({ api_types: resp });
		});
	}

	onSubmit(e) {
		e.preventDefault();
		history.push(`/photos?type=${this.state.type}&age=${this.state.age}`);
	}

	render() {
		return (
			<div>
				{this.state.api_types ? (
					<form onSubmit={this.onSubmit.bind(this)}>
						<div>
							<select
								onChange={this.inputChange}
								name="type"
								type="select"
								value={this.state.type}
							>
								<option value="">Plant Type</option>
								{this.state.api_types.map(type => (
									<option key={type} value={type}>
										{capitalizeFirst(type)}
									</option>
								))}
							</select>
						</div>
						<div>
							<input
								onChange={this.inputChange}
								name="age"
								placeholder="Plant Age (weeks)"
								type="number"
								min="0"
								value={this.state.age}
								pattern={'\\d*'}
							/>
						</div>
						<div>
							<input type="submit" value="Search" />
						</div>
					</form>
				) : null}
			</div>
		);
	}
}

export default SearchForm;
