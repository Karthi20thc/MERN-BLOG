import React from "react";
import "../../css/posts.css";
import Post from "../post/Post";

const Posts = (props) => {
	const { posts } = props; // from Home.jsx
	return (
		<div className='posts'>
			{posts &&
				posts.map((post) => (
					<Post
						key={post._id}
						postId={post._id}
						title={post.title}
						desc={post.desc}
						photo={post.photo}
						categories={post.categories}
						createdAt={post.createdAt}
					/>
				))}
		</div>
	);
};

export default Posts;
