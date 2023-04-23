import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import axios from 'axios';

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
    const [rows, setRows] = useState([]);
    const count = {
        name: 0,
        rank: 0,
        price: 0,
        priceChange1h: 0,
        priceChange1d: 0,
        priceChange1w: 0,
        market_cap_change_24h: 0,
    }

    const refreshPage = () => {
        //setIsLoading(true);
        // int a = 2;
        axios.get(
            "https://api.coinstats.app/public/v1/coins?skip=0&limit=2000&currency=INR"
        ).then((response) => {
            //console.log(response.data.coins);
            //setIsLoading(false);
            setRows(response.data.coins);
            //console.log(rows);
            //console.log(rows);
        });
    };

    useEffect(() => {
        refreshPage();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const SingUpUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const SignUpWithGoogle = () => {
        return signInWithPopup(auth, GoogleProvider);
    }

    const SingInWithUserEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    //Adding user to firestore

    var dataofuser = null;
    const GetCrypto = () => {
        const q = query(collection(firestore, "Trades"), where("user_email", "==", user.email));
        //console.log(q);
        return getDocs(q);
    }

    // console.log(user);
    const BuyingtheCrypto = async (id, name, price, index) => {
        try {
            const docRef = await addDoc(collection(firestore, "Trades"), {
                ind: index,
                uid: id,
                name: name,
                price: price,
                BuyAt: new Date().toDateString(),
                user_id: user.uid,
                user_email: user.email
            });
            console.log("Document written with ID: ", docRef.id);
            return docRef;
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const RemoveCrypto = async (buyingTime, cryptoid) => {
        console.log(buyingTime);
        // firestore.collection("Trades").where("user_email", "==", user.email).where("BuyAt", "==", buyingTime).where("uid", "==", cryptoid).get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         doc.ref.delete();
        //     });
        // });
        // console.log("Deleted");
        const q = query(collection(firestore, "Trades"), where("user_email", "==", user.email), where("BuyAt", "==", buyingTime), where("uid", "==", cryptoid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc1) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc1.id, " => ", doc1.data());
            deleteDoc(doc(firestore, "Trades", doc1.id));
            console.log("Deleted");
        }
        );
    }

    const SortingData = (column) => {
        console.log(column);
        if (column == "Link" || column == "Buy") return;
        console.log(column);
        console.log(count[column]);
        if (count[column] % 2 == 0) {
            drt.sort((a, b) => {
                if (a[column] > b[column]) {
                    return -1;
                }
                if (a[column] < b[column]) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            drt.sort((a, b) => {
                if (a[column] > b[column]) {
                    return 1;
                }
                if (a[column] < b[column]) {
                    return -1;
                }
                return 0;
            });
        }
        count[column] += 1;

        // let rty = drt;
        // setRows(rty);
        // drt = rty;
        console.log(drt);
    }



    const isLoggedIn = user ? true : false;
    let drt = rows;
    //const isDataisthere = drt ? isDsts : false;

    return (
        <FirebaseContext.Provider value={{ RemoveCrypto, SingUpUserWithEmailAndPassword, drt, SortingData, SignUpWithGoogle, isLoggedIn, SingInWithUserEmail, BuyingtheCrypto, GetCrypto }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
