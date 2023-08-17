const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			hiddenLogout: null,
			hiddenLogin: false,
			message: null,

			username: null,
			first_name: null,
			last_name: null,
			email: null,
			password: null,

			token_user:null,
			signup:false,
			isloged:false,
			user_loged : {}
		},
		actions: {

			signUpUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					let user = {}
					if (store.username != null && store.first_name != null && store.last_name != null && store.email != null && store.password != null) {
						user = {
							username: store.username,
							first_name: store.first_name,
							last_name: store.last_name,
							email: store.email,
							password: store.password
						}
					}

					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					
					const result = await response.json()
					if (response.status == 400) {
						setStore({signup:false})
						alert(result.message)
						
					}
					
					if (response.status == 404) {
						
						setStore({signup:false})
						alert("All fields are required")
						store.username = null
						store.first_name = null
						store.last_name = null
						store.email = null
						store.password = null
					}
					
					
					if (result.msg == "ok") {
						setStore({signup:true})
						alert("User add success")
					}
					
					
				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({signup:false})
				}
			},
			
			logInUser: async ()=>{
				const store = getStore()
				try {
					const user = {
						email : store.email,
						password : store.password
					}
				
					const response = await fetch(process.env.BACKEND_URL + "/login",{
						method : 'POST',
						body : JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if (result.msg == "ok"){
						localStorage.setItem("jwt-token", result.token);
						setStore({isloged:true})
					}else{
						alert(result.message)
					}	
					
				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({isloged:false})
				}

			},
			private : async ()=>{
				const token = localStorage.getItem('jwt-token')
				const store = getStore()
				setStore({token_user: token})
				try {
					const response = await fetch(process.env.BACKEND_URL + "/private",{
						method: "GET",
						headers: { 
							"Content-Type": "application/json",
							'Authorization': 'Bearer '+ token // ⬅⬅⬅ authorization token
							} 
					})
					const result = await response.json()
					setStore({user_loged : result})
					console.log(store.user_loged);

				} catch (error) {
					console.log(error + " Error loading message from backend");
				}
			},
			logout :() => {
				setStore({isloged:false})
				localStorage.clear();
			},
			changeSignUpStatus:(value)=>{
				setStore({signup:value})
			},
			changeLogInStatus:(value)=>{
				setStore({isloged:value})
			},

			changeLoginButton: (value) => (
				setStore({ hiddenLogin: value })
			),
			changeLogoutButton: (value) => {
				setStore({ hiddenLogout: value })
			},
			handleChange: e => {
				setStore({ [e.target.name]: e.target.value })
			}
		}
	};
};

export default getState;
