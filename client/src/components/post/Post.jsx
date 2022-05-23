import React from "react";
import { Link } from "react-router-dom";
import "../../css/post.css";

const Post = (props) => {
	const { title, postId, desc, photo, categories, createdAt } = props; // from Posts.jsx
	// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const PF = "https://blog-app-mernstack2022.herokuapp.com/images/";
	console.log(PF);
	return (
		<div className='post'>
			{/* 1 */}
			<img src={photo ? PF + photo : PF + "noCover.png"} alt='' className='postimg' />
			{/* 2 */}
			<div className='postinfo'>
				<div className='postcategories'>
					{/* <span className='postcategory'>Music</span>
					<span className='postcategory'>Life</span> */}
					{categories &&
						categories.map((category, index) => (
							<span className='postcategory' key={category}>
								{category ? category : "No category"}
							</span>
						))}
				</div>
				<Link to={`/post/${postId}`} className='link'>
					<span className='posttitle'>{title}</span>
				</Link>

				<span className='posttime'>{new Date(createdAt).toDateString()}</span>
			</div>
			{/* 3 */}
			<p className='postdescription'>{desc}</p>
		</div>
	);
};

export default Post;
