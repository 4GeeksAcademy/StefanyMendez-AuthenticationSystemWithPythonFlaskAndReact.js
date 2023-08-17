import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);
	!store.hiddenLogout ? actions.changeLogoutButton(true): null 
	
	return (
		<div className="container home mt-5">
			<img src="https://media.makeameme.org/created/hello-welcome-5af9a4.jpg"></img>
		</div>
	);
};
