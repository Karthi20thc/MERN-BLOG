import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../css/home.css";
import { useLocation } from "react-router-dom";
import { AxiosBaseUrl } from "../../axios";
import axios from "axios";

// -------------------------------------------------//
// axios.defaults.baseURL = "https://blog-app-mernstack2022.herokuapp.com/api";
const Home = () => {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();
	//console.log(search); // ex - ?category=music

	useEffect(() => {
		try {
			const fetchposts = async () => {
				// getting all posts
				const response = await AxiosBaseUrl.get("/post" + search);
				setPosts(response.data);
				console.log(response.data);
			};
			fetchposts();
		} catch (error) {
			console.log(error);
		}
	}, [search]);

	return (
		<div>
			<Header />
			<div className='home'>
				<Posts posts={posts} />
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;
