import { Register } from './Register';
import { Link } from 'react-router-dom';
import './Register.scss';

export const ContainerRegister = () => {
	const onInput = input => {};

	return (
		<div className='registerDiv'>
			<div className='backLinkDiv'>
				<Link className='backLink' to='/'>
					Wróć
				</Link>
			</div>
			<div className='inputDiv'>
				<Register onInput={onInput} />
			</div>
		</div>
	);
};
