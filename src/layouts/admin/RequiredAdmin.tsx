import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
	isAdmin: boolean;
	isStaff: boolean;
	isUser: boolean;
}

const RequireAdmin = <P extends Object>(WrappedComponent: React.ComponentType<P>) => {
	const WithAdminCheck: React.FC<P> = (props) => {
		const navigate = useNavigate();
		useEffect(() => {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login")
				return;
			}else {
				// decode jwt
				const decodedToken = jwtDecode(token) as JwtPayload;
				console.log(decodedToken);
				const isAdmin = decodedToken.isAdmin;
				console.log(isAdmin);

				if (!isAdmin) {
					navigate("/");
					return;
				}
			}
		},[navigate])

		return <WrappedComponent {...props} />
	}
	return WithAdminCheck;
}

export default RequireAdmin;