import React, { useState, useEffect, useContext } from 'react';
import {ProfileContext} from './../../ProfileContext';
import { Link } from 'react-router-dom';
import './Main.scss';

const DATA_API = 'https://swapi.py4e.com/api/people/';
const IMG = 'https://picsum.photos/534/383/?random&t=';

export function Profile() {
	const [profiles, setProfiles] = useContext(ProfileContext);
	const [profileIndex, setProfileIndex] = useState(0);
	const [numberOfProfiles, setnumberOfProfiles] = useState(0);

	let address = DATA_API + (profileIndex + 1);

	useEffect(() => {
		fetch(address)
			.then(response => {
				if (!response.ok) {
					throw new Error(`This is an HTTP error: The status is ${response.status}`);
				}
				return response.json();
			})
			.then(actualData => {
				console.log(actualData);
				actualData.img = IMG + new Date().getTime();
				setProfiles(profiles => [...profiles, actualData]);
			})
			.catch(err => {
				console.log(err.message);
			});
	}, [numberOfProfiles]);

	async function nextProfile() {
		document.getElementById('prevBtn').disabled = false;
		if (numberOfProfiles === profileIndex) {
			setnumberOfProfiles(numberOfProfiles + 1);
		}
		setProfileIndex(profileIndex + 1);
	}

	const prevProfile = () => {
		if (profileIndex > 0) {
			setProfileIndex(profileIndex - 1);
		} else if (profileIndex === 1) {
			document.getElementById('prevBtn').disabled = true;
		}
	};

	return (
		<div className='App'>
			<div className='author'>Antoni Michera</div>
			<Link to='/register' className='registerLink'>
				formularz rejestracyjny
			</Link>
			<div className='main'>
				<div className='image'>
					{!profiles[profileIndex] && <span>Ładuję...</span>}
					{profiles[profileIndex] && <img src={profiles[profileIndex].img} alt='profile' />}
				</div>
				<div className='elements'>
					<div className='name'>
						{!profiles[profileIndex] && <span>Ładuję...</span>}
						{profiles[profileIndex] && <span>{profiles[profileIndex].name}</span>}
					</div>
					<div className='icons'>
						<div className='icon'></div>
						<div className='icon'></div>
					</div>
					<div className='data'>
						<div className='text birth_year'>
							<span>born:</span>
							{!profiles[profileIndex] && <span>Ładuję...</span>}
							{profiles[profileIndex] && <span>{profiles[profileIndex].birth_year}</span>}
						</div>
						<div className='text eye-color'>
							<span>eye color:</span>
							{profiles[profileIndex] && <span>{profiles[profileIndex].eye_color}</span>}
							{!profiles[profileIndex] && <span>Ładuję...</span>}
						</div>
					</div>
				</div>
			</div>
			<div className='btns'>
				<button id='prevBtn' onClick={prevProfile}>
					previous profiles
				</button>
				<button id='nextBtn' onClick={nextProfile}>
					next profiles
				</button>
			</div>
		</div>
	);
}
