import React, { useContext, useState } from "react";
import { FiSettings } from "react-icons/fi";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Context } from "../../context/Context";
import "../../css/settings.css";
import { AxiosBaseUrl } from "../../axios";

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const PF = "https://blog-app-mernstack2022.herokuapp.com/images/";
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [file, setFile] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch({ type: "UPDATE_START" });
		// The object that we are going to send to server for update
		const updatedUser = {
			userId: user._id,
			username: username,
			email: email,
			password: password,
		};
		// handling image upload
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profilePic = filename;
			try {
				await AxiosBaseUrl.post("/upload", data);
			} catch (error) {
				console.log(error);
			}
		}
		// sending the request to the server
		try {
			const response = await AxiosBaseUrl.put(`/user/${user._id}`, updatedUser);
			setSuccess(true);
			dispatch({ type: "UPDATE_SUCCESS", payload: response.data });
		} catch (error) {
			console.log(dispatch({ type: "UPDATE_FAILURE" }));
		}
	};
	return (
		<React.Fragment>
			<Topbar />
			<div className='settings'>
				{/* 1 */}
				<div className='settingswrapper'>
					{/* 1a */}
					<div className='settingstitle'>
						<span className='settingstitleupdate'>update your Account</span>
						<span className='settingstitledelete'>Delete your Account</span>
					</div>
					{/* 1b */}
					<form className='settingsform' onSubmit={handleSubmit}>
						{/* 1b-1 */}
						<label htmlFor=''>Profile </label>
						{/* 1b-2 */}
						<div className='settingspp'>
							<img
								src={
									file
										? URL.createObjectURL(file)
										: user.profilePic
										? PF + user.profilePic
										: `${PF}noAvatar.png`
								}
								alt=''
							/>
							<label htmlFor='fileinput' className='iconcon'>
								<FiSettings />
								<span>change Image</span>
							</label>
							<input
								type='file'
								className='settingsppinput'
								id='fileinput'
								style={{ display: "none" }}
								onChange={(event) => {
									setFile(event.target.files[0]);
								}}
							/>
						</div>
						<label>Username</label>
						<input
							type='text'
							placeholder='Daniel'
							name='name'
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
						<label>Email</label>
						<input
							type='email'
							placeholder='daniel@gmail.com'
							name='email'
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
						<label>Password</label>
						<input
							type='password'
							placeholder='Password'
							name='password'
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<button className='settingssubmitbutton' type='submit'>
							Update
						</button>
						{success && <span>Profile has been updated</span>}
					</form>
				</div>
				{/* 2 */}
				<Sidebar />
			</div>
		</React.Fragment>
	);
};

export default Settings;
