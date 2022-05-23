import React, { useContext, useEffect, useState } from "react";
import { BsPinterest } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { Link } from "react-router-dom";
import { AxiosBaseUrl } from "../../axios";
import { Context } from "../../context/Context";
import "../../css/sidebar.css";

const Sidebar = () => {
	const [categories, setCategories] = useState([]);
	const { user } = useContext(Context);
	// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const PF = "https://blog-app-mernstack2022.herokuapp.com/images/";

	useEffect(() => {
		try {
			const fetchcategories = async () => {
				const response = await AxiosBaseUrl.get("/categories");
				// const response = await fetch("http://localhost:9000/api/categories/");
				setCategories(response.data);
				console.log(response.data);
			};
			fetchcategories();
		} catch (error) {
			console.log(error);
		}
	}, []);
	console.log(categories);

	return (
		<div className='sidebar'>
			{/* 1 */}
			<div className='sidebaritem'>
				<span className='sidebartitle'>About me</span>
				<img
					className='sidebarproimg'
					src={user.profilePic ? PF + user.profilePic : PF + "noAvatar.png"}
					alt=''
				/>
				<p className='desc'>
					“I am passionate about my work. Because I love what I do, I have a steady source
					of motivation that drives me to do my best. In my last job, this passion led me
					to challenge myself daily and learn new skills that helped me to do better work”
				</p>
			</div>
			{/* 2 */}
			<div className='sidebaritem'>
				<span className='sidebartitle'>Categories</span>
				<ul className='sidebarul'>
					{categories &&
						categories.map((category, index) => (
							<Link className='link' key={category.name} to={`/?category=${category.name} `}>
								<li className='sidebarlist'>{category.name}</li>
							</Link>
						))}
					{/* <li className='sidebarlist'>Music</li>
					<li className='sidebarlist'>sport</li>
					<li className='sidebarlist'>style</li>
					<li className='sidebarlist'>Tech</li>
					<li className='sidebarlist'>Cinema</li> */}
				</ul>
			</div>
			{/* 3 */}
			<div className='sidebaritem'>
				<span className='sidebartitle'>Follow Us</span>
				<div className='sidebarsocial'>
					<FaFacebook className='sidebaricon' />
					<FaInstagram className='sidebaricon' />
					<ImTwitter className='sidebaricon' />
					<BsPinterest className='sidebaricon' />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
