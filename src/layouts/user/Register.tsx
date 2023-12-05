import React, { useState } from "react";

export const RegisterPage : React.FC = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [gender,setGender] = useState('M');
	const [avatar, setAvatar] = useState<File | null>(null);
    // Error checking 
    const [errorUsername,setErrorUsername] = useState("");
    const [errorEmail,setErrorEmail] = useState("");
    const [errorPassword,setErrorPassword] = useState("");
    const [errorRepeatPassword,setErrorRepeatPassword] = useState("");

    const [notice,setNotice] = useState("");
    // process
    const handleSubmit = async (event: React.FormEvent) => {
        // Clear error
        setErrorUsername(''); 
        setErrorPassword('');
        setErrorEmail('');
        setErrorRepeatPassword('');

        // prevent continously click
        event.preventDefault();

        // validate
        const isUserName = !await validateExistingUsername(username);
        const isEmailValid = !await validateExistingEmail(email);
        const isPasswordValid = !validatePassword(password);
        const isRepeatPasswordValid = !validateRepeatPassword(repeatPassword);

        if (isEmailValid && isPasswordValid && isRepeatPasswordValid && isUserName ) {
            try {
				const based64Avatar = avatar ? await convertFileToBase64(avatar) : null;
				console.log(based64Avatar);
                const url = `http://localhost:8080/account/register`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        gender: gender,
                        active: 0,
                        activeCode: "",
	                    avatar: based64Avatar
                    })
                });
                if (response.ok) {
                    setNotice("Successfully registered");
                } else {
                    setNotice("Failed to register");
                }
            } catch (error) {

            }
        }
    }
	const convertFileToBase64 = (file : File) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result ? (reader.result as string).split(",")[1]: null);
			reader.onerror = (error) => reject(error);
		})
	}
    const validateExistingUsername = async (username: string) => {
        const url = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
        try {
            const response = await fetch(url);
            const data = response.text();
            if (await data === "true") {
                setErrorUsername('this username is already exists');
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error on checking username");
            return false;
        }
    }
    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        // change username value
        setUsername(event.target.value);
        // validation
        setErrorUsername('');
        
        return validateExistingUsername(event.target.value);
    }
    const validateExistingEmail = async (email: string) => {
        const url = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
        try {
            const response = await fetch(url);
            const data = response.text();
            if (await data === "true") {
                setErrorEmail('this email is already exists');
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error on checking email");
            return false;
        }
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        // change username value
        setEmail(event.target.value);
        // validation
        setErrorEmail('');
        
        return validateExistingEmail(event.target.value);
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrorPassword('');
        return validatePassword(event.target.value);
    }
    const validatePassword = (password : string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword("Password must be contain at least 8 characters and include at least 1 special character");
            return true;
        } else {
            setErrorPassword("");
            return false;
        }
    }
    const handleRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
        return validateRepeatPassword(event.target.value);
    }

    const validateRepeatPassword = (repeatPassword : String) => {
        if (repeatPassword !== password) { 
            setErrorRepeatPassword("Password not match");
            return true;
        } else {
            setErrorRepeatPassword("");
            return false;
        }
    }
	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setAvatar(file);
		}
	}
    return (
        <div className="container">
            <h1 className="mt-5">
                Register
            </h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">

                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" className="form-control" value={username} onChange={handleUsername}/>
                        <div className="" style={{color : "red"}}>{errorUsername}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={handleEmail}/>
                        <div className="" style={{color : "red"}}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" value={password} onChange={handlePassword}/>
                        <div className="" style={{color : "red"}}>{errorPassword}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                        <input type="password" id="repeatPassword" className="form-control" value={repeatPassword} onChange={handleRepeatPassword}/>
                        <div className="" style={{color : "red"}}>{errorRepeatPassword}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" id="firstName" className="form-control" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" id="lastName" className="form-control" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="number" id="phoneNumber" className="form-control" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input type="text" id="gender" className="form-control" value={gender} onChange={(e) => {setGender(e.target.value)}}/>
                    </div>
	                <div className="mb-3">
		                <label htmlFor="avatar" className={"form-label"}>Avatar</label>
		                <input type="file" id={"avatar"} className={"form-control"} accept={"images/*"} onChange={handleAvatarChange}/>
	                </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" >Register</button>
                        <div className="" style={{color : "green"}}>{notice}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}