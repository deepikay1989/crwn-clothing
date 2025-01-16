import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils"
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { SignUp } from "../../componnets/sign-up-form/sign-up-form";
import { SignInForm } from "../../componnets/sign-in form/sign-in-form";
import './authentication.styles.scss';

const Authentication =()=> {
    // useEffect(async ()=>{
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user)
    //     }
    // }, [])
    const logGoggleUser = async() =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }
    
    return (
        <div className="authentication-container">
            
             {/* <button onClick={logGoggleUser}>Sign in with Goggle popup</button> */}
             <SignInForm />
             {/* <button onClick={signInWithGoogleRedirect}>Sign in with Goggle redirect</button> */}
             <SignUp />
        </div>
    )
}

export {Authentication}