
import SignUpForm from "../../components/sign_up/sign_up.component";
import SignIn from "../../components/sign_in/sign_in.component";

import './authentication.styles.scss'

const Authentication = () => {

	return (
		<div className='authentication-container'>
			<SignIn/>
			<SignUpForm/>
		</div>
	);
};

export default Authentication;
