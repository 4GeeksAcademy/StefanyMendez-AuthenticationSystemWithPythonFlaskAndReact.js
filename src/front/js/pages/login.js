import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	store.isloged ? navigate('/private'):null
	store.signup ? actions.changeSignUpStatus(false):null
	!store.hiddenLogout ? actions.changeLogoutButton(true): null 
	
	
	return (
		
		<div className="container login mt-5">
			<form className="needs-validation text-center" noValidate
			onSubmit={e => {
				e.preventDefault()
				actions.logInUser()
			}}>
				<h1 className="text-white text-center mt-5 ">LOG IN</h1>
				<label className="text-white">Please enter your email and password</label>
				<div className="row m-4 mt-5">
					<div className="col-md-12">
						<input
							name="email"
							type="email"
							className="form-control"
							placeholder="Email"
							id="validationCustom01"
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
							id="validationCustom02"
							onChange={actions.handleChange}
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="text-center mt-2 mb-4">

								<button className="btn btn-login border text-white" type="submit">Log In</button>

						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-12">
						<div className="text-center mt-2 mb-4">
							<label className="text-white fw-bold">Don't have an account</label>
							<Link to="/signup">
								<button className="btn text-secondary fw-bold" onClick={() => actions.changeLoginButton(false)}>Sign Up</button>
							</Link>
						</div>
					</div>
				</div>
			</form>
			
		</div>
		
	);
};
