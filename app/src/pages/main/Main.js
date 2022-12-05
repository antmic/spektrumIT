import React, { useEffect, useContext } from 'react';
import {
	ProfileContext,
	profileIndexContext,
	numberOfProfilesContext,
	prevBtnDisabledContext,
} from '../../ContextProvider';
import { Link } from 'react-router-dom';
import './Main.scss';
import icon1 from './icon-person.svg'
import icon2 from './icon-checkmark.svg'

const DATA_API = 'https://swapi.py4e.com/api/people/';
const IMG = 'https://picsum.photos/534/383/?random&t=';

export function Profile() {
	const [profiles, setProfiles] = useContext(ProfileContext);
	const [profileIndex, setProfileIndex] = useContext(profileIndexContext);
	const [numberOfProfiles, setNumberOfProfiles] = useContext(numberOfProfilesContext);
	const [prevBtnDisabled, setPrevBtnDisabled] = useContext(prevBtnDisabledContext);

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
		setPrevBtnDisabled(0);
		if (numberOfProfiles === profileIndex) {
			setNumberOfProfiles(numberOfProfiles + 1);
		}
		setProfileIndex(profileIndex + 1);
	}

	const prevProfile = () => {
		if (profileIndex === 0) {
			setPrevBtnDisabled(1);
		} else if (profileIndex === 1) {
			setProfileIndex(profileIndex - 1);
			setPrevBtnDisabled(1);
		} else if (profileIndex > 1) {
			setProfileIndex(profileIndex - 1);
		}
	};

	return (
		<div className='App'>
			<div className='top'>
				<div className='author'>Antoni Michera</div>
				<Link to='/register' className='registerLink'>
					<div>formularz rejestracyjny</div>
				</Link>
			</div>
			<div className='main'>
				<div className='image'>
					{!profiles[profileIndex] && <div>Ładuję...</div>}
					{profiles[profileIndex] && <img src={profiles[profileIndex].img} alt='profile' />}
				</div>
				<div className='elements'>
					<div className='nameBox'>
						{!profiles[profileIndex] && <div>Ładuję...</div>}
						{profiles[profileIndex] && <div className='name'>{profiles[profileIndex].name}</div>}
						<div className='icons'>
							<div className='icon1'>
								<img src={icon1} alt='person icon'></img>
							</div>
							<div className='icon2'>
								<img src={icon2} alt='checkmark icon'></img>
							</div>
						</div>
					</div>
					<div className='data'>
						<div className='text birth_year'>
							<label>born:</label>
							{!profiles[profileIndex] && <div>Ładuję...</div>}
							{profiles[profileIndex] && <div>{profiles[profileIndex].birth_year}</div>}
						</div>
						<div className='text eye-color'>
							<label>eye color:</label>
							{profiles[profileIndex] && <div>{profiles[profileIndex].eye_color}</div>}
							{!profiles[profileIndex] && <div>Ładuję...</div>}
						</div>
					</div>
				</div>
			</div>
			<div className='btns'>
				<button id='prevBtn' onClick={prevProfile} disabled={prevBtnDisabled}>
					<div>prev profiles</div>
				</button>
				<button id='nextBtn' onClick={nextProfile}>
					<div>next profiles</div>
				</button>
			</div>
		</div>
	);
}
