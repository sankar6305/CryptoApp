import React from 'react';
import { useFirebase } from "../Context/Firebase";
import { Button } from "@mui/material";

const TradePage = () => {
    const firebase = useFirebase();

    const HandleOutput = async () => {
        if (!firebase.isLoggedIn) {
            alert("Sign in first");
        }else await firebase.GetCrypto();
        //.then((docs => console.log(docs.docs[0].data())))
    }

  return (
    <div>
          <Button onClick={HandleOutput}>Sign In with Google</Button>
    </div>
  )
}

export default TradePage
