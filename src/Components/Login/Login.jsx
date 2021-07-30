import React, { useContext } from 'react'
import style from './Login.module.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../utilies/firebase';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }


    // // getUserToken
    // const getUserToken = () => {
    //     firebase.auth().currentUser.getIdToken( true).then(function(idToken) {
    //         sessionStorage.setItem('token', idToken);
    //     }).catch(function(error) {
    //         // Handle error
    //     });          
    // }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, photoURL, email} = result.user;
            const signedInUser = {name: displayName, email, img:photoURL} 
            setLoggedInUser(signedInUser);
            
            // for user token
            // getUserToken();
            
            history.replace(from);

          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }

    return (
        <>
            <div className={style.login__main__area}>
                <button onClick={handleGoogleSignIn} type="button" className={style.google__btn} >
                Sign in with Google
                </button>
            </div>
        </>
    )
}

export default Login
