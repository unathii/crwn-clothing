import FormInput from "../form_input/form_input.component";
import Button from "../button/button.component";
import {useState} from "react";
import {
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import './sign_in.styles.scss'

const defaultFormFields = {
	email: '',
	password: ''
}

const SignIn = () => {

	const [formFields, setFormFields] = useState(defaultFormFields);
	const {email, password} = formFields;

	const signInWithGoogle = async () => {
		const {user} = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value});
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await signInAuthUserWithEmailAndPassword(email, password)
			console.log(res)
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert('Incorrect password for email!')
					break;
				case "auth/user-not-found":
					alert('User not found')
					break
				default:
					alert("An error occurred, check your internet speed/connection")
			}
		}
	}

	return (
		<div className='sign-in-container'>
			<h2>I already have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleFormSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<div className={'buttons-container'}>
					<Button type={'submit'}>
						SIGN IN
					</Button>
					<Button type={'button'} buttonType={'google'} onClick={signInWithGoogle}>
						SIGN IN WITH GOOGLE
					</Button>
				</div>

			</form>

		</div>
	);

}

export default SignIn;