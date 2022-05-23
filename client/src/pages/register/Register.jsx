import React, { useRef, useState } from "react";
import "../../css/register.css";
import { Link } from "react-router-dom";
import { AxiosBaseUrl } from "../../axios";

const Register = () => {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const [error, setError] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();
		setError(false);
		try {
			const response = await AxiosBaseUrl.post("/auth/register", {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			});
			console.log(response);
			response.data && window.location.replace("/login");
		} catch (error) {
			// console.log(error);
			setError(true);
		}
	};

	// useEffect(() => {
	// 	const sendRegisterData = async () => {
	// 		const usernameRef = username.current.value;
	// 		const emailRef = email.current.value;
	// 		const passwordRef = password.current.value;
	// 		const response = await axios.post("/auth/register", {
	// 			username: usernameRef,
	// 			email: emailRef,
	// 			password: passwordRef,
	// 		});
	// 		console.log(response);
	// 	};
	// 	sendRegisterData();
	// }, []);

	return (
		<div className='register'>
			{/* 1 */}
			<span className='logintitle'>Register</span>
			{/* 2 */}
			<form className='loginform' onSubmit={submitHandler}>
				<label htmlFor=''>UserName</label>
				<input type='text' placeholder='Username here...' ref={username} />
				<label htmlFor=''>Email</label>
				<input
					type='text'
					className='logininput'
					placeholder='Email here....'
					ref={email}
				/>
				<label htmlFor=''>Password</label>
				<input
					type='password'
					className='logininput'
					placeholder='password here....'
					ref={password}
				/>
				<button className='loginbutton' type='submit'>
					Register
				</button>
				{error && (
					<span style={{ backgroundColor: "red", color: "white", padding: "5px" }}>
						something went Wrong
					</span>
				)}
				<span>Already have a Account? Login</span>
			</form>
			{/* 3 */}
			<button className='loginregisterbutton'>
				<Link className='link' to={`/login`}>
					Login
				</Link>
			</button>
		</div>
	);
};

export default Register;
