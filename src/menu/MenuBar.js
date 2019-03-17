import React from 'react';
import Logo from 'icons/logo.svg';
import Camera from 'icons/camera.svg';
import history from 'utils/history.js';
import styles from './MenuBar.module.scss';

function MenuBar(props) {
	return (
		<div className={styles.menuBar}>
			<div
				onClick={() => history.push('/')}
				className={styles.menuBar_logo}
			>
				<img src={Logo} /> <div>Plant Tracker</div>
			</div>
			<img
				onClick={() => history.push('/new')}
				src={Camera}
				className={styles.menuBar_camera}
			/>
		</div>
	);
}

export default MenuBar;
