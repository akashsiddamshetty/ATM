import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

library.add(faEye, faEyeSlash);


const Signup = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", amount: "", password: "", confirmpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        let cardNumber = Math.floor(100000000000 + Math.random() * 900000000000);
        const { name, amount, password, confirmpassword } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: name, amount: amount, cardNumber: cardNumber, password: password, confirmpassword: confirmpassword
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
        } else {
            window.alert(`Registration succesfull And this is your Account number ${cardNumber} copy and save it for further use`);
            navigate("/");
        }
    }

    const [visible, setVisible] = useState(false);


    return (
        <>  <div className="signup-card">

            <form className="signup" autoComplete="off" >

                <div className="signup-form">
                    <TextField
                        id="username"
                        type="text"
                        label="Username"
                        variant="outlined"
                        autocompvare="off"
                        value={user.name}
                        name="name"
                        onChange={handleInputs}
                    />
                    <TextField
                        id="amount"
                        type="text"
                        label="Enter Amount"
                        variant="outlined"
                        autocompvare="off"
                        value={user.amount}
                        name="amount"
                        onChange={handleInputs}
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        autocompvare="off"
                        className="password"
                        value={user.password}
                        name="password"
                        onChange={handleInputs}
                    />
                    <TextField
                        id="confirm password"
                        type={visible ? "text" : "password"}
                        label="Confirm PassWord"
                        variant="outlined"
                        autocompvare="off"
                        value={user.confirmpassword}
                        name="confirmpassword"
                        onChange={handleInputs}
                    />
                    <span className="signup-eyeicon">
                        <FontAwesomeIcon icon={visible ? "eye-slash" : "eye"}
                            onClick={() => setVisible(visiblity => !visiblity)} />
                    </span>
                    <Button type="submit" onClick={postData}>Creat Account</Button>
                </div>

            </form>
            <img className="signup-img" src="https://gawvs.in//assets/img/signup.png" alt="signup-img" />

        </div>
        </>
    );
}

export default Signup;