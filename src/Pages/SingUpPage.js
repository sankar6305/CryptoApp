import React, {useEffect, useState} from 'react';

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
    const SinUpFunction = async(e) => {
        e.preventDefault();
        console.log("SingUp calling");
        await firebase.SingUpUserWithEmailAndPassword(email, password);
        console.log("SingUp Function Called");
    }

    //SingUp Function with Google
    const GooggleSingUp = async (e) => {
        e.preventDefault();
        console.log("Google SingUp calling");
        await firebase.SignUpWithGoogle();
        console.log("Google SingUp Function Called");
    }
    //actual return
    return (<div style={{ margin: "45px", color:"black" }}>
        <h1>SinUp Here</h1>
        <form onSubmit={SinUpFunction}>
            <label>Username :  </label>
            <input onChange={(e) => setEmail(e.target.value)} value={ email } type="text" placeholder="username" name="username"></input> <br></br>
            <label>Password  :  </label>
            <input onChange={(e) => setPassword(e.target.value)} value={ password } type="password" placeholder="password" name="password"></input> <br></br>
            <button type="submit" >SinUp</button>
        </form>
        <h4>or</h4>
        <button onClick={GooggleSingUp}>Singup with Google</button>
    </div>)
}

export default SingUpPage
