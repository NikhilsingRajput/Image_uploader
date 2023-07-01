import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";




export default function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'https://file-upload-api-lqoy.onrender.com'
    const Authsignin = async (e) => {
        console.log(url)
        // console.log(email, password)
        e.preventDefault()
        try {
            const res = await axios.post(url, {
                "email": email,
                "password": password
            })
            console.log(url,res)
            navigate("/home")
        } catch (error) {
            console.log(error);
            alert("Invalid Credientials")
        }

    }

    return <div className="container">
         <button className=" btn-Signup" onClick={()=>navigate('/Signup')}  >SignUp</button>
        <h1 className="content">Sign In</h1>
        <form method="POST" action="" onSubmit={Authsignin}>
            <div className="content" >

                <input
                     placeholder="Email"
                    type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="content">

                <input 
                    placeholder="Password" type="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn-submit"  type="submit" >LogIn</button>
            <br/>
            {/* <button className=" btn-Signup" onClick={()=>navigate('/Signup')}  >SignUp</button> */}
        </form>


    </div>
}