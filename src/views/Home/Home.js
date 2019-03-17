import React, { Fragment } from 'react';
import SearchForm from 'components/searchForm/SearchForm.js';
import styles from './Home.module.scss';
import ApiMock from 'apiMock/ApiMock.js';
import PhotoPreview from 'components/photoPreview';

//Home Page with Recent Photos and Search
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recent: null
		};
	}
	componentDidMount() {
		ApiMock.getRecentPlants(4).then(response => {
			this.setState({ recent: response });
		});
	}

	render() {
		return (
			<div>
				<div className={styles.recent}>
					<div className={styles.recent_title}>Recent Photos</div>
					{this.state.recent && (
						<Fragment>
							<div className={styles.recent_photoContainer}>
								{this.state.recent.map(p => (
									<PhotoPreview
										key={`preview_${p.type}_${p.date}`}
										plant={p}
									/>
								))}
							</div>
							<div onClick={()=>this.props.history.push('/photos')} className={styles.recent_seeAll}>See All Photos →</div>
						</Fragment>
					)}
				</div>
				<div className={styles.search_title}>Search Photos</div>
				<div className={styles.searchForm}>
					<SearchForm />
				</div>
			</div>
		);
	}
}

export default Home;
