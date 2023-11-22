import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
export const ActivateAccount = () => {
    const [emailUser,setEmail] = useState("");
    const [activeCode, setActiveCode] = useState("");
    const [isActive, setActive] = useState(false);
    const [notice,setNotice] = useState("");

    const {email, code} = useParams();
    useEffect(() => {
        if (email && code) {
            setEmail(email);
            setActiveCode(code);
            activateAccount();
        }
    }, [emailUser,activeCode]);
    const activateAccount = async () => {
        try {
            const url : string = `http://localhost:8080/account/activate?email=${emailUser}&activeCode=${activeCode}`
            const response = await fetch(url,{
                method: "GET",
            });
            if (response.ok) {
                setActive(true);
            } else {
                setNotice(response.text() + "");
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h1>Activate Account: </h1>
            {
                isActive ?
                (
                    <div>
                        <p>Activate Successfully</p>
                    </div>
                ) :
                (
                    <div>
                        <p>{notice}</p>
                    </div>
                )
            }
        </div>
    );
}