import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import "../../css/singlepost.css";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { AxiosBaseUrl } from "../../axios";

const Singlepost = () => {
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const PF = "https://blog-app-mernstack2022.herokuapp.com/images/";
	const [post, setPost] = useState({});
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [updateMode, setUpdateMode] = useState(false);
	const { user } = useContext(Context);

	// whenever the path changes, fetch
	useEffect(() => {
		const fetchSingle = async () => {
			const response = await AxiosBaseUrl.get(`/post/${path}`);
			console.log(response.data);
			setPost(response.data);
			setTitle(response.data.title);
			setDesc(response.data.desc);
		};
		fetchSingle();
	}, [path]);

	const deleteHandler = async () => {
		try {
			await AxiosBaseUrl.delete(`/post/${post._id}`, {
				data: {
					username: user.username,
				},
			});
			window.location.replace("/");
		} catch (error) {
			console.log(error);
		}
	};
	const updateHandler = async () => {
		try {
			await AxiosBaseUrl.put(`/post/${post._id}`, {
				username: user.username,
				title: title,
				desc: desc,
			});
			setUpdateMode(false);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='singlepost'>
			{/* 1 */}
			<div className='singlepostwrapper'>
				{/* 1a */}
				<img
					src={post.photo ? PF + post.photo : PF + "noCover.png"}
					alt=''
					className='singlepostimg'
				/>
				{/* 1b */}
				{updateMode ? (
					<input
						className='updateinput'
						type='text'
						value={title}
						autoFocus
						onChange={(event) => {
							setTitle(event.target.value);
						}}
					/>
				) : (
					<h1 className='singleposttitle'>
						{post.title}
						{post.username === user.username && (
							<div className='singlepostedit'>
								<AiTwotoneEdit
									className='singleposticon'
									style={{ color: "green" }}
									onClick={() => {
										setUpdateMode(true);
									}}
								/>
								<AiFillDelete
									className='singleposticon'
									style={{ color: "tomato" }}
									onClick={deleteHandler}
								/>
							</div>
						)}
					</h1>
				)}

				<div className='singlepostinfo'>
					<span className='singlepostauthor'>
						Author:
						<Link className='link' to={`/?user=${post.username}`}>
							<b>{post.username}</b>
						</Link>
					</span>
					<span className='singleposttime'>{post.createdAt}</span>
				</div>
				{updateMode ? (
					<textarea
						className='updatetextarea'
						value={desc}
						onChange={(event) => {
							setDesc(event.target.value);
						}}
					></textarea>
				) : (
					<p className='singlepostdesc'>{post.desc}</p>
				)}
				{updateMode && (
					<button className='updatebtn' onClick={updateHandler}>
						Update
					</button>
				)}
			</div>
		</div>
	);
};

export default Singlepost;
