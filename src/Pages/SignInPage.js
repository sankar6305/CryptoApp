import React, { useEffect, useState } from 'react';

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
        await firebase.SingInWithUserEmail(email, password);
        console.log("SingIn Function Called");
    }

    //SingIn Function with Google
    const GooggleSingIn = async (e) => {
        e.preventDefault();
        console.log("Google SingUp calling");
        await firebase.SignUpWithGoogle();
        console.log("Google SingUp Function Called");
    }

    //actual return
    return (<div style={{ margin: "45px", color:"black" }}>
        <h1>SinIn Here</h1>
        <form onSubmit={SinInFunction}>
            <label>Username :  </label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="username" name="username"></input> <br></br>
            <label>Password  :  </label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" name="password"></input> <br></br>
            <button type="submit" >SinIn</button>
        </form>
        <h4>or</h4>
        <button onClick={GooggleSingIn}>SingIn with Google</button>
    </div>)
}

export default SignInPage;