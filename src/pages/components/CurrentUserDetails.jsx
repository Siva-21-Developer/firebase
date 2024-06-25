/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./CurrentUserDetails.css";
import {collection, onSnapshot } from "firebase/firestore";
import img from "../images/images.png";
import { signOut } from "firebase/auth";

const CurrentUserDetails =()=>
    {
        const [currentUser, sercurrentUser] = useState([]);

        useEffect(
            ()=>
                {
                    const user = auth.currentUser;
                    if(user)
                        {
                            const unsing = onSnapshot(
                                collection(db, "users"),
                                (querySnapshot) =>
                                    {
                                        const users = querySnapshot.docs
                                        .map(doc=>({id: doc.id, ...doc.data()}))
                                        .filter(userdoc => userdoc.id === user.uid);
                                        sercurrentUser(users);
                                    },
                                    (error) =>
                                        {
                                            console.log(error);
                                        }
                            );
                            return () => unsing();
                        }
                },[]);

                
        const signout = ()=>
            {
                signOut(auth).then(()=>
                {

                }).catch((error)=>
                {
                    console.log(error)
                })
            }

        return(
            
        <div className="Usercondetials">
                {
                    currentUser.map((user, index) => (
                        <>
                        <div className="userDetails">
                            <img
                                src={user.imageUrl ? user.imageUrl : img}
                                alt={`${user.name}'s image`} />
                        <h1>
                                {user.name}
                        </h1>
                        </div>
                        <div className="bars">

                        </div>

                            <input type="button" value="Logout" className="logout-btn" onClick={signout} />
                            </>
                    ))
                 }
            </div>
            
        )
    }

    export default CurrentUserDetails