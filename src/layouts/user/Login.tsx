import React, {useState} from "react";
export const Login = () => {
	const [username,setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error,setError] = useState("");
	const handleLogin = () => {
		const loginRequest = {
			username: username,
			password: password
		};

		fetch("http://localhost:8080/account/login",{
			method: "POST",
			headers: {
				"Content-type":"application/json"
			},
			body: JSON.stringify(loginRequest)
		}).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Fail to Login");
				}
			}
		).then(
			(data) => {
				const {jwt} = data;
				localStorage.setItem('token',jwt);
				setError("Login Success");
			}
		).catch(error => {
			console.log(error);
			setError("Login Fail");
		}) ;
	}


	return (
		<div className='container'>
			<div className="form-signin">
				<h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
				<label className="sr-only">Tên đăng nhập</label>
				<input type="username" id="username" className="form-control mb-2" placeholder="Username"
				       value={username}
				       onChange={(e) => setUsername(e.target.value)}
				/>
				<label className="sr-only">Password</label>
				<input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required
				       value={password}
				       onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me" /> Remember me
					</label>
				</div>
				<button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleLogin}>Đăng nhập</button>
				{
					error &&
					<div style={{ color: 'red' }}>{error}</div>
				}
			</div>
		</div>
	);
}