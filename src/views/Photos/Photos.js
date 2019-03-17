import React, { Fragment } from 'react';
import Search from 'icons/search.svg';
import SearchForm from 'components/searchForm/SearchForm.js';
import styles from './Photos.module.scss';
import { capitalizeFirst, ageString } from 'utils/string.js';
import ApiMock from 'apiMock/ApiMock.js';
import PhotoPreview from 'components/photoPreview';

const queryString = require('query-string');

/* 
Component that queries 'mock API' for images of plants
*/
class Photos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSearch: false, //toggles whether search form is visible
			search: '',
			plants: null
		};
	}

	
	componentDidMount() {
		this.getPlants();
	}

	componentDidUpdate() {
		if (!this.state.plants) {
			this.getPlants();
		}
	}

	getPlants() {
		ApiMock.getPlants(
			queryString.parse(this.props.history.location.search)
		).then(resp => this.setState({ plants: resp }));
	}

	//overwrite search when query params change
	static getDerivedStateFromProps(props, state) {
		let newSearch = searchString(
			queryString.parse(props.history.location.search)
		);
		if (newSearch !== state.search) {
			return { ...state, ...{ search: newSearch, plants: false } };
		}

		return state;
	}


	render() {
		return (
			<div className={styles.photos}>
				<div
					onClick={() =>
						this.setState({
							showSearch: !this.state.showSearch
						})
					}
					className={styles.photos_search}
				>
					<img src={Search} />
					<div>
						{this.state.search
							? this.state.search
							: 'Search Photos'}
					</div>
					{this.state.search && (
						<div
							onClick={e => {
								e.stopPropagation();
								this.props.history.push('/photos?');
							}}
							className={styles.photos_search_clear}
						>
							clear
						</div>
					)}
				</div>
				{this.state.showSearch && (
					<div className={styles.searchForm}>
						<SearchForm />
					</div>
				)}
				<div className={styles.photos_container}>
					{this.state.plants && (
						<Fragment>
							{this.state.plants.map(p => (
								<div
									key={`preview_${p.type}_${p.date}`}
									className={styles.photos_preview}
								>
									<PhotoPreview plant={p} className={styles.photos_tile} />
								</div>
							))}
							{this.state.plants.length === 0 && (
								<div>No Plants Match This Search</div>
							)}
						</Fragment>
					)}
				</div>
			</div>
		);
	}
}

const searchString = search => {
	let s = [];
	if (search.type) {
		s.push(capitalizeFirst(search.type));
	}
	if (search.age) {
		s.push(ageString(search.age));
	}

	return s.join(' - ');
};

export default Photos;
