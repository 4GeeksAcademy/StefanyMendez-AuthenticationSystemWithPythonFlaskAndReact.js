import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	
	store.signup ? navigate('/login'):null
	
	return (
		
		<div className="container login mt-5">
			<form className="needs-validation text-center" noValidate 
				onSubmit={e => {
					e.preventDefault()
					actions.signUpUser()
					e.target.reset();
				}}
			>
				<h1 className="text-white text-center mt-5 ">SIGN UP</h1>

				<div className="row m-4 mt-5">
					<div className="col-md-12">
						<input
							name="username"
							type="text"
							className="form-control"
							placeholder="Username"
							id="input_username"
							onChange={actions.handleChange}
							required
						/>
					</div>

				</div>
				<div className="row m-4">
					<div className="col-md-12">
						<input
							name="first_name"
							type="text"
							className="form-control"
							placeholder="First Name"
							id="input_first_name"
							onChange={actions.handleChange}
							required
						/>
					</div>
				</div>
				<div className="row m-4">
					<div className="col-md-12">
						<input
							name="last_name"
							type="text"
							className="form-control"
							placeholder="Last Name"
							id="input_last_name"
							onChange={actions.handleChange}
							required
						/>
					</div>
				</div>
				<div className="row m-4">
					<div className="col-md-12">
						<input
							name="email"
							type="text"
							className="form-control"
							placeholder="Email"
							id="input_email"
							onChange={actions.handleChange}
							required
						/>
					</div>
				</div>
				<div className="row m-4">
					<div className="col-md-12">
						<input
							name="password"
							type="password"
							className="form-control"
							placeholder="Password"
							id="input_password"
							onChange={actions.handleChange}
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="text-center mt-2 mb-4">
							<button className="btn btn-login border text-white" type="submit">Sign Up
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
