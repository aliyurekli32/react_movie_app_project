import { createContext,useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from "../auth/firebase"
import { useNavigate } from "react-router-dom";

const Context = createContext();


export const ContextProvider =({children})=>{
    const navigate=useNavigate();
    const[userInformations,setUserInformations]=useState({
        registerEmail:"",
        registerPassword:"",
        loginEmail:"",
        loginPassword:"",
        });
        const[user,setUser]=useState({});

        useEffect(() => {
            onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser);
                
                
            });
        }, [auth]);
        

        

    const register = async ()=>{
        try {
      const user = await createUserWithEmailAndPassword(auth, userInformations.registerEmail, userInformations.registerPassword);
      console.log(user);
        }catch (error){
            console.log(error.message);
            
        }
       setUserInformations({
        registerEmail:"",
        registerPassword:"",
        loginEmail:"",
        loginPassword:"",
        })
        navigate(-1); 
    }
    const login= async ()=>{
        try {
            const user = await signInWithEmailAndPassword(auth, userInformations.loginEmail, userInformations.loginPassword);
            console.log(user);
              }catch (error){
                  console.log(error.message);
                  
              }
             setUserInformations({
              registerEmail:"",
              registerPassword:"",
              loginEmail:"",
              loginPassword:"",
              }) 
              navigate(-1);
    }
    const logout= async ()=>{
        await signOut(auth);
        navigate("/");
    }


const values={userInformations,setUserInformations, register, login, logout, user};
return(
    <Context.Provider value={values}>{children}</Context.Provider>
);
}

export default Context;