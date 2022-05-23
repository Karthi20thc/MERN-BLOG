import React, { useContext } from "react";
import "../../css/topbar.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { BsPinterest, BsFillFilePostFill } from "react-icons/bs";
import { AiFillHome, AiOutlineProfile } from "react-icons/ai";
import { MdContactPage } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Topbar = () => {
	const { user, dispatch } = useContext(Context);
	// const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const PF = "https://blog-app-mernstack2022.herokuapp.com/images/";
	const logoutHandler = () => {
		dispatch({ type: "LOGOUT" });
		//localStorage.removeItem("user");//not needed because dispatch({type:"LOGOUT"}) set the state to null, and also because of line17 in Context.js
		window.location.reload();
	};
	return (
		<div className='topbar'>
			<div className='topleft'>
				<FaFacebook className='topbaricon' />
				<FaInstagram className='topbaricon' />
				<ImTwitter className='topbaricon' />
				<BsPinterest className='topbaricon' />
			</div>
			<div className='topcenter'>
				<ul className='toplist'>
					<li className='toplistitem'>
						<AiFillHome />
						<Link to='/' className='link'>
							<span>Home</span>
						</Link>
					</li>
					<li className='toplistitem'>
						<AiOutlineProfile />
						<Link to='/' className='link'>
							<span>About</span>
						</Link>
					</li>
					<li className='toplistitem'>
						<MdContactPage />
						<Link to='/' className='link'>
							<span>Contact</span>
						</Link>
					</li>
					<li className='toplistitem'>
						<BsFillFilePostFill />
						<Link to='/write' className='link'>
							<span>write</span>
						</Link>
					</li>
				</ul>
			</div>
			<div className='topright'>
				<span>Welcome {user.username}</span>
				{user ? (
					<div className='logincon'>
						<Link to={`/settings`}>
							<img
								className='topbarimg'
								src={user.profilePic ? PF + user.profilePic : PF + "noAvatar.png"}
								alt=''
							/>
						</Link>

						<div className='toplistitem' onClick={logoutHandler}>
							<FiLogOut />
							<span>Logout</span>
						</div>
					</div>
				) : (
					<ul className='toplist'>
						<li className='toplistitem'>
							<Link className='link' to='/login'>
								Login
							</Link>
						</li>
						<li className='toplistitem'>
							<Link className='link' to='/register'>
								Register
							</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default Topbar;
