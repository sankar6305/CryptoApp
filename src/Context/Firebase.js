import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs, query, where } from 'firebase/firestore';

//Creating Context api with default value as null
const FirebaseContext = createContext(null)

const firebaseConfig = {
    apiKey: "AIzaSyAXO8VaLw_TzCd2_fbkf7CcK2eEvY4DpKM",
    authDomain: "bookify-28bae.firebaseapp.com",
    projectId: "bookify-28bae",
    storageBucket: "bookify-28bae.appspot.com",
    messagingSenderId: "715131403611",
    appId: "1:715131403611:web:c96bd7b15ede6287812e7e"
};

const firebaseapp = initializeApp(firebaseConfig);

//Exporting the context
export const useFirebase = () => useContext(FirebaseContext);


const auth = getAuth(firebaseapp);

const GoogleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseapp);

//Exporting the provider
export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const SingUpUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((value) => {
                console.log(value);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    const SignUpWithGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
            .then((value) => {
                console.log(value);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const SingInWithUserEmail = (email, password) => {
        console.log("SingIn");
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                console.log(value);
            }
        )
            .catch((error) => {
                console.log(error);
            }
        );

    }


    //Adding user to firestore

    const GetCrypto = () => {
        const q = query(collection(firestore, "Trades"), where("user_email", "==", user.email));
        //console.log(q);
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            });
        });
    }

    // console.log(user);
    const BuyingtheCrypto = async (id, name, price) => {
        try {
            const docRef = await addDoc(collection(firestore, "Trades"), {
                uid: id,
                name: name,
                price: price,
                BuyAt: new Date(),
                user_id: user.uid,
                user_email: user.email
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }



    
    
    const isLoggedIn = user ? true : false;
    return (
        <FirebaseContext.Provider value={{ SingUpUserWithEmailAndPassword, SignUpWithGoogle, isLoggedIn, SingInWithUserEmail, BuyingtheCrypto, GetCrypto }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
