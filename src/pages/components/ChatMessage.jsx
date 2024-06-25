/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./ChatMessage.css";
import { deleteDoc, doc } from "firebase/firestore";
import 'bootstrap-icons/font/bootstrap-icons.css';
import img from "../images/images.png";


const ChatMessage = (props)=>
    {
        const [messageClass,messageActive] = useState(false);
        useEffect(
            ()=>
                {
                    const user = auth.currentUser;        
                    messageActive(props.chats.userId === user.uid ? true : false);
                }, [props.chats.userId]
        )     
        
        const deleteChat =async(id)=>
            {
                await deleteDoc(doc(db,"solochat",id));
            }
        
        return(
            <>
            <div className={messageClass ? "chat-message own":"chat-message"}>
                <div className="profile">
                <img src={props.chats.userImageUrl!=="" ?props.chats.userImageUrl : img} alt="profile-pic"/>
                </div>
                <div className="chat-message-text">
                    <p>{props.chats.text}</p>
                </div>
                {messageClass ? <button type="button" className="del-btn" onClick={()=>deleteChat(props.id)}><i className="bi bi-trash"></i></button>
                :null}

            </div>
            </>
        )   
    }

export default ChatMessage