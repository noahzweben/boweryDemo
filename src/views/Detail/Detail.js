import React from 'react';
import ApiMock from 'apiMock/ApiMock.js';
import { capitalizeFirst, ageString, dateString } from 'utils/string.js';
import styles from './Detail.module.scss';


//Component for Larger Detail View of Plant Photo
class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plant: null
		};
	}

	componentDidMount() {
		ApiMock.getDetail(this.props.match.params.id).then(resp => {
			this.setState({ plant: resp });
			console.log(resp);
		});
	}

	componentDidUpdate() {}

	render() {
		if (!this.state.plant) return null;
		return (
			<div>
				<div
					onClick={() => this.props.history.push('/photos')}
					className={styles.detail_back}
				>
					Back to Plants
				</div>
				<div className={styles.detail_title}>
					{capitalizeFirst(this.state.plant.type)} -{' '}
					{ageString(this.state.plant.age)}
					<div>{dateString(this.state.plant.date)}</div>
				</div>
				<img
					ref={ref => (this.img = ref)}
					src={this.state.plant.img}
					className={styles.detail_img}
				/>
			</div>
		);
	}
}

export default Detail;
