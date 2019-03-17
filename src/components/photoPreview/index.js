import React from 'react';
import styles from './PhotoPreview.module.scss';
import { capitalizeFirst, ageString } from 'utils/string.js';
import history from 'utils/history.js';
const cn = require('classnames');

/*
Photo Preview component shows circular icon of 
photo as well as type and age
*/
function PhotoPreview(props) {
	return (
		<div onClick={() => history.push(`/plant/${props.plant.id}`)}>
			<img
				className={cn(styles.preview_img, props.className)}
				src={props.plant.img}
			/>
			<div className={styles.preview_text}>
				<div>{capitalizeFirst(props.plant.type)}</div>
				<div>{ageString(props.plant.age)}</div>
			</div>
		</div>
	);
}

export default PhotoPreview;
