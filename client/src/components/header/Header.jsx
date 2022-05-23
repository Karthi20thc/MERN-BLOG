import React from "react";
import "../../css/header.css";
import Topbar from "../topbar/Topbar";

const Header = () => {
	return (
		<div className='header'>
			<Topbar />
			<div className='headertitles'>
				<span className='headertitlebg'>welcome to my Blog</span>
				<span className='headertitlesm'>
					Life brings us as many joyful moments as it does downfalls, and although there
					are days we wish there was a manual to follow, it simply wouldn’t be the same
					without the spontaneity. The journey of life may not become easier as we grow
					older, but we do seem to understand it better as our perspectives evolve.
					Whether you’re embarking on a new adventure right out of school or you want to
					explore different paths in your personal life, it’s never too late to change
					what the future looks like.
				</span>
			</div>
			{/* <img
				src='https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_960_720.jpg'
				alt=''
				className='headerblogimg'
			/> */}
		</div>
	);
};

export default Header;
