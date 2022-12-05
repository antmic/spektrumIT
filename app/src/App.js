import { Routes, Route } from 'react-router-dom';
import { Register } from './pages/register/Register';
import { Profile } from './pages/main/Main';
import { useState } from 'react';
import {
	ProfileContext,
	profileIndexContext,
	numberOfProfilesContext,
	prevBtnDisabledContext,
} from './ContextProvider';
import './App.scss'

function App() {
	const [profiles, setProfiles] = useState([]);
	const [profileIndex, setProfileIndex] = useState(0);
	const [numberOfProfiles, setNumberOfProfiles] = useState(0);
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(1);

	return (
		<ProfileContext.Provider value={[profiles, setProfiles]}>
			<profileIndexContext.Provider value={[profileIndex, setProfileIndex]}>
				<numberOfProfilesContext.Provider value={[numberOfProfiles, setNumberOfProfiles]}>
						<prevBtnDisabledContext.Provider value={[prevBtnDisabled, setPrevBtnDisabled]}>
								<Routes>
									<Route path='/' element={<Profile />}></Route>
									<Route path='/register' element={<Register />}></Route>
								</Routes>
						</prevBtnDisabledContext.Provider>
				</numberOfProfilesContext.Provider>
			</profileIndexContext.Provider>
		</ProfileContext.Provider>
	);
}

export default App;
