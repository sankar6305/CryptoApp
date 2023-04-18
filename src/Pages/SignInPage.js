import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { useFirebase } from "../Context/Firebase";

function SignInPage() {
    const firebase = useFirebase();

    //Already Login or not
    useEffect(() => {
        console.log("SingUp Page");
        // if (firebase.isLoggedIn) {
        //     window.location.href = "/";
        // }
    }, [firebase]);



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //SingIn Function with emails and password
    const SinInFunction = async (e) => {
        e.preventDefault();
        console.log("SingIn calling");
        await firebase.SingInWithUserEmail(email, password).then((res) => {
            alert("Login Successfull");
            window.location.href = "/";
        }
        ).catch((err) => {
            alert("Invalid Password or Email");
        });

    }

    //SingIn Function with Google
    const GooggleSingIn = async (e) => {
        e.preventDefault();
        console.log("Google SingUp calling");
        await firebase.SignUpWithGoogle();
        alert("Login Successfull");
        window.location.href = "/";
        console.log("Google SingUp Function Called");
    }

    //actual return
    return (<div className='LoginDiv'>
        <h1>SignIn Here</h1>
        <form onSubmit={SinInFunction} className='Form'>
            <label>Username  </label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="username" name="username"></input> <br></br>
            <label>Password   </label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" name="password"></input> <br></br>
            <Button type="submit" >Sign In</Button>
            <h4>or</h4>
            <Button onClick={GooggleSingIn}>SingIn with Google</Button>
        </form>

    </div>)
}

export default SignInPage;