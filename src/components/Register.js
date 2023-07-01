import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');            // for email error
    const [phone, setPhone] = useState(0);
    const [profession, setProfession] = useState('');
    const [isValid, setIsValid] = useState(false);               // for incorrect profession
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState("");      // validating password error
    const [passErr, setPassErr] = useState(false)                // for password error
    const [confirmPassword, setConfirmPassword] = useState(0);
    const [error, setError] = useState("");

    const handelSubmit = async (e) => {
        const url = 'https://file-upload-api-lqoy.onrender.com';
        e.preventDefault();
        try {

            const res = await axios.post(url+"/signup", {
                "name": name,
                "email": email,
                "phone": phone,
                "profession": profession,
                "password": password,
                "confirmPassword": confirmPassword
            });

            console.log(res.data);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
       
    }

 

    const handleChange = (e) => {
        const input = e.target.value;
        setProfession(input);
        
    };

  
    const PasswordHandler = (e) => {
        // const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        // const specialLetters = /[A-Za-z]+/;
        const item = e.target.value;
        setPassword(item);
        if (item.length < 6) {
            setPassErr(true)
        }
        // else if (!specialCharacters.test(e) || !specialLetters.test(e)) {
        //     setPassErr(true)
        // } 
        else {
            setPassErr(false)
        }

    }

    //validating email address
    const handleEmailChange = (e) => {
        const value = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError(<div style={{ color: "white" }}>*Please enter a valid email address</div>);
        } else {
            setEmail(value);
            setEmailError('');
        }
    }

    // validating confirm password
    const handleConfirmPassword = (e) => {
        const cpass = e.target.value
        setConfirmPassword(e.target.value);
        if (password !== cpass) {
            setError("Password and Confirm Password do not match! ");
            setValidPassword("");
        } else {
            setError("");
            setValidPassword(password);
        }
    };








    return (
        <div className="main-div">
            <div className="container">
                <form method="POST" action="/" onSubmit={handelSubmit}>
                    <h1 className="heading1">Signup / Register</h1>
                   
                    <div className="">
                        <input onChange={(e) => { setName(e.target.value) }}
                            value={name}
                            required className="content" type={'text'} placeholder={"Name"} />
                        <input className="content" type={'email'}
                            placeholder={"Email"}
                            required
                            onChange={handleEmailChange} />
                        {(emailError && emailError.length !== 0) ? <p className="Emailerror">{emailError}</p> : null}
                        {/* to display email error */}
                    </div>
                    <div className="input-box">
                        <input
                            className="content"
                            type={'text'}
                            pattern="[0-9]{1}[0-9]{9}"
                            placeholder={"Phone"}
                            onChange={(e) => { setPhone(e.target.value) }} />
                        <input
                            className="content"
                            type={'text'}
                            // required
                            placeholder={"Profession"}
                            value={profession}
                            onChange={handleChange}
                            required />

                        {(isValid == 0 && isValid < 31) ? (
                            // <span style={{ color: "green" }}>Valid profession!</span>
                            null
                        ) : (
                            <div style={{ color: "white" }}>
                                Profession can only contain upto 30 letters and numbers.
                            </div>
                        )}
                    </div>
                    <div className="input-box">
                        <input
                            className="content"
                            type={'password'}
                            placeholder={"Password"}
                            required
                            onChange={PasswordHandler} />

                        <input
                            className="content"
                            type={'password'}
                            required
                            placeholder={"Confirm Password"}
                            onChange={handleConfirmPassword}
                        />
                        {/* // password error displaying here */}
                        {passErr ? <div style={{ color: "white" }} >Password Invalid</div> : null}
                        <div>
                            {/* //confirm password error displaying here */}
                            {error ? <p style={{ color: "white" }}>{error}</p> : null}
                        </div>

                    </div>
                    
                    <button className="btn-submit" type="submit" >Register</button>

                </form>

            </div>

        </div>
    )
}

export default Register;


