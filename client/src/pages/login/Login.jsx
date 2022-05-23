import React, { useContext, useRef, useState } from "react";
import "../../css/login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { AxiosBaseUrl } from "../../axios";

const Login = () => {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const [error, setError] = useState(false);
	console.log(isFetching);

	const submitHandler = async (event) => {
		event.preventDefault();
		// Before trying ,dispatch LOGIN_START
		dispatch({ type: "LOGIN_START" });
		// Alternative to line15 -> dispatch(LoginStart());

		try {
			const response = await AxiosBaseUrl.post("/auth/login", {
				username: userRef.current.value,
				password: passwordRef.current.value,
			});
			// if try is successfull, dispatch LOGIN_SUCCESS
			dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
		} catch (error) {
			// console.log(error);
			setError(true);
		}
	};
	return (
		<div className='login'>
			{/* 1 */}
			<span className='logintitle'>Login</span>
			{/* 2 */}
			<form className='loginform' onSubmit={submitHandler}>
				<label htmlFor=''>userName</label>
				<input
					type='text'
					className='logininput'
					placeholder='Username here....'
					ref={userRef}
				/>
				<label htmlFor=''>Password</label>
				<input
					type='password'
					className='logininput'
					placeholder='password here....'
					ref={passwordRef}
				/>
				<button className='loginbutton' type='submit'>
					Login
				</button>
				{error && (
					<span style={{ color: "orangered", padding: "5px", backgroundColor: "white" }}>
						Something went wrong try Again
					</span>
				)}
				<span>Dont have a Account? Register</span>
			</form>
			{/* 3 */}
			<button className='loginregisterbutton'>
				<Link className='link' to={`/register`}>
					Register
				</Link>
			</button>
		</div>
	);
};

export default Login;
