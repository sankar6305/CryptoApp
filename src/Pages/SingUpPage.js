import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { useFirebase } from "../Context/Firebase";



const SingUpPage = () => {

    const firebase = useFirebase();
    //Already Login or not
    useEffect(() => {
        console.log("SingUp Page");
        // if(firebase.isLoggedIn){
        //     window.location.href = "/";
        // }
    }, [firebase]);



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //SingUp Function with emails and password
    const SinUpFunction = async (e) => {
        e.preventDefault();
        console.log("SingUp calling");
        await firebase.SingUpUserWithEmailAndPassword(email, password).then((res) => {
            alert("Login Successfull");
            window.location.href = "/";
        }
        ).catch((err) => {
            alert("Invalid Password or Email");
        });
    }

    //SingUp Function with Google
    const GooggleSingUp = async (e) => {
        e.preventDefault();
        console.log("Google SingUp calling");
        await firebase.SignUpWithGoogle().then((res) => {
            console.log("Google SingUp Function Called");
            alert("Login Successfull");
            window.location.href = "/";
        })
    }
    //actual return
    return (<div className='LoginDiv'>
        <h1>SinUp Here</h1>
        <form onSubmit={SinUpFunction} className='Form'>
            <label>Username    </label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="username" name="username"></input> <br></br>
            <label>Password  </label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" name="password"></input> <br></br>
            <Button type="submit" >SinUp</Button>
            <h4>or</h4>
            <Button onClick={GooggleSingUp}>Singup with Google</Button>
        </form>
    </div>)
}

export default SingUpPage
