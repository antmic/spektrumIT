import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './../../ProfileContext';
import './Register.scss';

export const Register = props => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [accept, setAccept] = useState('');
	const navigate = useNavigate();
	const [profiles, setProfiles] = useContext(ProfileContext);

	const InputHandler = () => {
		const star_wars_data = [];
		profiles.forEach(element => {
			star_wars_data.push({ name: element.name, created: element.created, vehicles: element.vehicles });
		});
		props.onInput(login);
		props.onInput(password);
		props.onInput(email);
		props.onInput(phone);
		props.onInput(accept);
		async function sendForm() {
			let result = await fetch('http://127.0.0.1:3002/register', {
				method: 'post',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({
					form: {
						login: login,
						password: password,
						email: email,
						phone: phone,
						accept: accept,
					},
					sw: star_wars_data,
				}),
			});
			result = await result.json();
			console.log(result.message);
		}
		sendForm();
		setLogin('');
		setPassword('');
		setEmail('');
		setPhone('');
		setAccept('');
		alert('Wysłano!');
		navigate('/');
	};
	return (
		<div className='formDiv'>
			<div className='title'>Formularz rejestracyjny</div>
			<div className='formItem login'>
				<label className='label' htmlFor='login'>
					Login:
				</label>
				<input
					type='text'
					id='login'
					className='input'
					value={login}
					required
					minLength={3}
					maxLength={30}
					onChange={event => setLogin(event.target.value)}></input>
			</div>
			<div className='formItem password'>
				<label className='label' htmlFor='password'>
					Hasło:
				</label>
				<input
					type='password'
					id='password'
					className='input'
					value={password}
					required
					minLength={8}
					maxLength={30}
					pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'
					onChange={event => setPassword(event.target.value)}></input>
			</div>
			<div className='formItem email'>
				<label className='label' htmlFor='email'>
					E-mail:
				</label>
				<input
					type='email'
					id='email'
					className='input'
					value={email}
					required
					minLength={5}
					maxLength={30}
					pattern='[A-Za-z0-9]+@[A-Za-z0-9]+\.[a-zA-Z]+'
					onChange={event => setEmail(event.target.value)}></input>
			</div>
			<div className='formItem phone'>
				<label className='label' htmlFor='phone'>
					Numer telefonu:
				</label>
				<input
					type='tel'
					id='phone'
					className='input'
					value={phone}
					required
					minLength={9}
					maxLength={9}
					onChange={event => setPhone(event.target.value)}></input>
			</div>
			<div className='formItem accept'>
				<label className='label' htmlFor='accept'>
					<input
						type='checkbox'
						id='accept'
						className='input'
						value={accept}
						required
						onChange={event => setAccept(event.target.value)}></input>
					Akceptuję Regulamin
				</label>
			</div>
			<button className='inputBtn' onClick={InputHandler}>
				zapisz
			</button>
		</div>
	);
};
