import React, { useContext, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import Topbar from "../../components/topbar/Topbar";
import { Context } from "../../context/Context";
import "../../css/write.css";
import { AxiosBaseUrl } from "../../axios";

const Write = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const submitHandler = async (event) => {
		event.preventDefault();
		const post = {
			username: user.username,
			title: title,
			desc: desc,
		};

		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			post.photo = filename; // setting this new property to the post object
			// uploading the photo
			console.log(post);
			try {
				await AxiosBaseUrl.post("/upload", data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		}
		// sending the post object to the server
		try {
			const response = await AxiosBaseUrl.post("/post", post);
			window.location.replace("/post/" + response.data._id);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Topbar />
			<div className='write'>
				{/* 1 */}
				{file && <img className='writeimage' src={URL.createObjectURL(file)} alt='' />}

				{/* 2 */}
				<form className='writeform' onSubmit={submitHandler}>
					{/* 2a */}
					<div className='writeformgroup'>
						<label htmlFor='fileinput'>
							<AiFillFileAdd className='writeicon' />
						</label>
						<input
							type='file'
							id='fileinput'
							style={{ display: "none" }}
							onChange={(event) => {
								setFile(event.target.files[0]);
							}}
						/>
						<input
							type='text'
							placeholder='Title'
							className='writeinput'
							autoFocus={true}
							onChange={(event) => {
								setTitle(event.target.value);
							}}
						/>
					</div>
					{/* 2b */}
					<div className='writeformgroup'>
						<textarea
							type='text'
							placeholder='Tell your story.......'
							className='writeinput writetext'
							onChange={(event) => {
								setDesc(event.target.value);
							}}
						></textarea>
					</div>
					{/* 2c */}
					<button className='writesubmit' type='submit'>
						Publish
					</button>
				</form>
			</div>
		</div>
	);
};

export default Write;
