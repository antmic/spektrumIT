import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileContext, profileIndexContext, numberOfProfilesContext } from './../../ContextProvider';
import './Register.scss';

export const Register = () => {
	const [profiles] = useContext(ProfileContext);
	const [, setProfileIndex] = useContext(profileIndexContext);
	const [, setNumberOfProfiles] = useContext(numberOfProfilesContext);
	const [login, setLogin] = useState('');
	const [loginValid, setLoginValid] = useState(false);
	const [showLoginError, setShowLoginError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(false);
	const [showPasswordError, setShowPasswordError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [showEmailError, setShowEmailError] = useState(false);
	const [phone, setPhone] = useState('');
	const [phoneValid, setPhoneValid] = useState(false);
	const [showPhoneError, setShowPhoneError] = useState(false);
	const [accept, setAccept] = useState(false);
	const [showAcceptError, setShowAcceptError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setProfileIndex(profileIndex => profileIndex + 1);
		setNumberOfProfiles(numberOfProfiles => numberOfProfiles + 1);
	}, []);

	const InputHandler = () => {
		const star_wars_data = [];
		profiles.forEach(element => {
			star_wars_data.push({ name: element.name, created: element.created, vehicles: element.vehicles });
		});
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
		if (loginValid && passwordValid && emailValid && phoneValid && accept) {
			sendForm();
			setLogin('');
			setPassword('');
			setEmail('');
			setPhone('');
			setAccept('');
			alert('Wysłano!');
			navigate('/');
		} else if (loginValid && passwordValid && emailValid && phoneValid && !accept) {
			setShowAcceptError(true);
		} else {
			alert('Błąd w formularzu!');
		}
	};

	const validate = (input, type) => {
		let valid = false;
		let regex = null;
		switch (type) {
			case 'text':
				regex = /^([a-zA-Z0-9]{3,30})$/;
				valid = regex.test(input);
				if (valid) {
					setLoginValid(true);
					setShowLoginError(false);
				} else {
					setLoginValid(false);
					setShowLoginError(true);
				}
				break;
			case 'password':
				regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,30})/;
				valid = regex.test(input);
				if (valid) {
					setPasswordValid(true);
					setShowPasswordError(false);
				} else {
					setPasswordValid(false);
					setShowPasswordError(true);
				}
				break;
			case 'email':
				regex = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[a-zA-Z]+/;
				valid = regex.test(input);
				if (valid) {
					setEmailValid(true);
					setShowEmailError(false);
				} else {
					setEmailValid(false);
					setShowEmailError(true);
				}
				break;
			case 'phone':
				regex = /^([0-9]{9,9})$/;
				valid = regex.test(input);
				if (valid) {
					setPhoneValid(true);
					setShowPhoneError(false);
				} else {
					setPhoneValid(false);
					setShowPhoneError(true);
				}
				break;
			case 'checkbox':
				if (accept) {
					setShowAcceptError(false);
				} else {
					setShowAcceptError(true);
				}
				break;
			default:
				alert('Nieznany błąd');
				break;
		}
		return valid;
	};

	return (
		<div className='register'>
			<div className='top'>
				<div className='backLinkDiv'>
					<Link className='backLink' to='/'>
						Wróć
					</Link>
				</div>
				<div className='title'>Formularz rejestracyjny</div>
			</div>
			<div className='styleBar'></div>
			<div className='form'>
				<div className='formItem login'>
					<label className='label' htmlFor='login'>
						Login:
					</label>
					<div className={`inputWrapper ${showLoginError ? 'redBorder' : ''}`}>
						<input
							type='text'
							id='login'
							className='input'
							value={login}
							minLength={3}
							maxLength={30}
							onChange={event => setLogin(event.target.value)}
							onBlur={event => validate(login, 'text')}></input>
						{showLoginError && <div>Nieprawidłowy login - użyj od 3 do 30 znaków, tylko litery i cyfry</div>}
						{loginValid && <div>&#128077;</div>}
					</div>
				</div>
				<div className='formItem password'>
					<label className='label' htmlFor='password'>
						Hasło:
					</label>
					<div className={`inputWrapper ${showPasswordError ? 'redBorder' : ''}`}>
						<input
							type='password'
							id='password'
							className='input'
							value={password}
							minLength={8}
							maxLength={30}
							onChange={event => setPassword(event.target.value)}
							onBlur={event => validate(password, 'password')}></input>
						{showPasswordError && (
							<div>
								Nieprawidłowe hasło - użyj od 8 do 30 znaków, w tym jedną małą literę, dużą literę, cyfrę i znak
								specjalny
							</div>
						)}
						{passwordValid && <div>&#128077;</div>}
					</div>
				</div>
				<div className='formItem email'>
					<label className='label' htmlFor='email'>
						E-mail:
					</label>
					<div className={`inputWrapper ${showEmailError ? 'redBorder' : ''}`}>
						<input
							type='email'
							id='email'
							className='input'
							value={email}
							minLength={5}
							maxLength={40}
							onChange={event => setEmail(event.target.value)}
							onBlur={event => validate(email, 'email')}></input>
						{showEmailError && <div>Nieprawidłowy format adresu e-mail</div>}
						{emailValid && <div>&#128077;</div>}
					</div>
				</div>
				<div className='formItem phone'>
					<label className='label' htmlFor='phone'>
						Numer telefonu:
					</label>
					<div className={`inputWrapper ${showPhoneError ? 'redBorder' : ''}`}>
						<input
							type='tel'
							id='phone'
							className='input'
							value={phone}
							minLength={9}
							maxLength={9}
							onChange={event => setPhone(event.target.value)}
							onBlur={event => validate(phone, 'phone')}></input>
						{showPhoneError && <div>Nieprawidłowy numer telefonu</div>}
						{phoneValid && <div>&#128077;</div>}
					</div>
				</div>
				<div className='formItem accept'>
					<label className='label' htmlFor='accept'>
						<input
							type='checkbox'
							id='accept'
							className={`input ${showAcceptError ? 'redBox' : ''}`}
							value={'accept'}
							checked={accept}
							readOnly={true}
							onClick={event => setAccept(!accept)}
							onBlur={event => validate(accept, 'checkbox')}></input>
						Akceptuję Regulamin
						{showAcceptError && <div>Wymagana akceptacja regulaminu</div>}
						{accept && <div>&#128077;</div>}
					</label>
				</div>
				<button className='inputBtn' onClick={InputHandler}>
					<div>zapisz</div>
				</button>
			</div>
		</div>
	);
};
