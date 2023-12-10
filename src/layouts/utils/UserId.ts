import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    userId : number;
    isAdmin: boolean;
	isStaff: boolean;
	isUser: boolean;
}
export const getUserId = () => {
    var userId : number = 0;
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }else {
        // decode jwt
        const decodedToken = jwtDecode(token) as JwtPayload;
        userId = decodedToken.userId;
    }
    return userId;
}