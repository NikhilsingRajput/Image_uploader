import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Logout(){
    // let url = 'http://localhost:5000';
    const url = 'https://file-upload-api-lqoy.onrender.com'
const navigate = useNavigate()
    useEffect(()=>{
        axios.get(url+'/logout')
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
        navigate('/')
        window.location.reload(true)
    })
    

    return<>Logout ...
    </>
}