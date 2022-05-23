import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Singlepost from "../../components/singlepost/Singlepost";
import Topbar from "../../components/topbar/Topbar";
import "../../css/single.css";

const Single = () => {
	return (
		<div className='single'>
			<Topbar />
			<div className='singlepostcon'>
				<Singlepost />
				<Sidebar />
			</div>
		</div>
	);
};

export default Single;
