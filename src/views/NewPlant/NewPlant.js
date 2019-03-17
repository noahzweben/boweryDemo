import React from 'react';
import ApiMock from 'apiMock/ApiMock.js';
import { capitalizeFirst } from 'utils/string.js';
import inputChange from 'utils/inputChange.js';
import history from 'utils/history.js';
import Camera from 'icons/camera.svg';
import styles from './NewPlant.module.scss';


//Form for creating a new plant entry
class NewPlant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photo: '',
			age: '',
			type: '',
			api_types: null
		};
		this.inputChange = inputChange.bind(this);
		this.createPhoto = this.createPhoto.bind(this);
	}

	componentDidMount() {
		ApiMock.getPlantTypes().then(resp => {
			this.setState({ api_types: resp });
		});
	}

	
	//renders preview image of picture
	preview(e) {
		var file = this.file.files[0];
		let reader = new FileReader();
		console.log('here');
		reader.readAsDataURL(file);
		reader.addEventListener(
			'load',
			() => {
				this.previewImg.src = reader.result;
				this.previewImg.style="height:50px; width: 50px;"
			},
			false
		);
	}

	onSubmit(e) {
		e.preventDefault();
		var file = this.file.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener(
			'load',
			() => {
				this.createPhoto(reader.result);
			},
			false
		);
	}

	//"posts" results to API
	createPhoto(photo) {
		let body = {
			img: photo,
			type: this.state.type,
			age: this.state.age,
			date: new Date().toString()
		};
		ApiMock.postPlant(body).then(resp => history.push(`/plant/${resp}`));
	}


	render() {
		console.log(this.state.photo);
		return (
			<div className={styles.newForm}>
				{this.state.api_types ? (
					<form onSubmit={this.onSubmit.bind(this)}>
						<div>
							<select
								required
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
								required
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
							<label htmlFor="fileUpload">
								<div className={styles.newForm_file_label}>
									<img src={Camera} /> <div>Add Photo</div>
								</div>
								<img
									ref={ref => (this.previewImg = ref)}
									className={styles.newForm_file_preview}
								/>
							</label>
							<input
								onChange={this.preview.bind(this)}
								className={styles.newForm_file_input}
								id="fileUpload"
								ref={ref => (this.file = ref)}
								required
								name="photo"
								placeholder="Take picture"
								type="file"
								accept="image/*"
								capture
							/>
						</div>
						<div>
							<input type="submit" value="Add Plant" />
						</div>
					</form>
				) : null}
			</div>
		);
	}
}

export default NewPlant;
