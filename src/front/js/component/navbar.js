import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/" className="text-decoration-none " >
					<span className="navbar-brand mb-0 h1 text-white" onClick={()=>actions.changeLoginButton(false)}>Authentication System</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-danger" hidden={store.hiddenLogout} onClick={()=>actions.logout()}><i className="fa-solid fa-right-from-bracket"></i></button>
					</Link>
					<Link to="/login">
						<button className="btn btn-login-nav text-white border" hidden={store.hiddenLogin} onClick={()=>actions.changeLoginButton(true)}>Login</button>
					</Link>
				</div>
			</div>
		</nav>
	)
};
