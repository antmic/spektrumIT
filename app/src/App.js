import { Routes, Route } from 'react-router-dom';
import { ContainerRegister } from './pages/register/ContainerRegister';
import { Profile } from './pages/main/Main';
import { useState } from 'react';
import {ProfileContext} from './ProfileContext'

function App() {

	const [profiles, setProfiles] = useState([]);

	return (
		<ProfileContext.Provider value={[profiles, setProfiles]}>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Profile />}></Route>
					<Route path='/register' element={<ContainerRegister />}></Route>
				</Routes>
			</div>
		</ProfileContext.Provider>
	);
}

export default App;
