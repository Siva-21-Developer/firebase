/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import "./Chat.css";
import img from "../images/images.png";
import ChatMessage from "./ChatMessage";
import NewMessage from "./NewMessage";
import { auth, db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Chat = (props) => {
    const [userChat, setUserChat] = useState([]);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (props.userId !== "") {
            const user = auth.currentUser;
            if (user) {
                const chatQuery = query(
                    collection(db, "solochat"),
                    orderBy("createdAt", "asc")
                );
                const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
                    const userChatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(userDoc=> userDoc.receviverUserId==props.userId && userDoc.userId == user.uid || userDoc.receviverUserId==user.uid && userDoc.userId == props.userId);
                    setUserChat(userChatList);
                    setShowChat(true);
                }, (error) => {
                    console.log("Error getting documents: ", error);
                });

                // Cleanup subscription on unmount
                return () => unsubscribe();
            }
        }
    }, [props.userId]);
    

    return (
        <>
            <div className="chatcon-con">
                {showChat ? (
                    <>
                    <div className="top-bar">
                        <aside>
                            <img src={props.userimg!=="" ? props.userimg :img} alt="" />
                        </aside>
                        <h2>{props.userdetails}</h2>
                    </div>
                        <div className="chatcon">
                            {userChat.map((datas) => <ChatMessage id={datas.id} chats={datas} />)}
                        </div>
                        <NewMessage userId={props.userId} />
                    </>
                ) : "no Chat"}
            </div>
        </>
    );
}

export default Chat;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-key */
// import "./Chat.css"
// import ChatMessage from "./ChatMessage"
// import NewMessage from "./NewMessage"
// import { auth, db } from "../../firebase";
// import React, { useEffect, useState } from "react";
// import { collection, getDocs, orderBy,query } from "firebase/firestore";

// const Chat = () => {
//     const [userChat, setUserChat] = useState([]);

//     const usedata = useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             const fetchUserMessages = async () => {
//                 try {
//                     const chatQuery = query(collection(db, "chat"), orderBy("createdAt", "asc"));
//                     const querySnapshot = await getDocs(chatQuery);
//                     const userChatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                     setUserChat(userChatList);
//                 } catch (e) {
//                     console.log(e);
//                 }
//             };
//             fetchUserMessages();
//         }
//     }, []);

//     const userdata =(data)=>
//         {
//             // setUserChat(data);
//         }

//     return (
//         <>
//             <div className="chatcon">
//                 {userChat.map((datas) => <ChatMessage key={datas.id} chats={datas} />)}
//                 <NewMessage userdatas={usedata} />
//             </div>
//         </>
//     );
// }

// export default Chat;



// /* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-key */
// import "./Chat.css"
// import ChatMessage from "./ChatMessage"
// import NewMessage from "./NewMessage"
// import { auth, db } from "../../firebase";
// import React, { useEffect, useState } from "react";
// import { collection, getDoc } from "firebase/firestore";

// const Chat = ()=>
//     {

//         const[userChat, setUserChat] = useState([]);

//         useEffect(()=>{
//         const user = auth.currentUser;
//         if(user)
//             {
//                 const fetchUsermessage = async ()=>
//                     {
//                         try
//                         {
//                         const querySnapshot = await getDoc(collection(db,"chat"));
//                         const userChatList = querySnapshot.docs
//                         .map((doc)=>({id: doc.id, ...doc.data()}))
//                         setUserChat(userChatList);
//                     }
//                 catch(e)
//                 {
//                     console.log(e);
//                 }
//                 }
//                 fetchUsermessage();
//             }
//         },[]);

//         const chats = [
//             {id:1, message:"Hello", sender:"John"},
//             {id:2, message:"Hi", sender:"Jane"},
//             {id:3, message:"How are you?", sender:"John"},
//             {id:4, message:"I am good", sender:"Jane"},
//             {id:5, message:"What are you doing?", sender:"John"},
//             {id:6, message:"I am studying", sender:"Jane"},
//             {id:7, message:"What are you studying?", sender:"John"},
//             {id:8, message:"I am studying computer science", sender:"Jane"},
//             {id:1, message:"Hello", sender:"John"},
//             {id:2, message:"Hi", sender:"Jane"},
//             {id:3, message:"How are you?", sender:"John"},
//             {id:4, message:"I am good", sender:"Jane"},
//             {id:5, message:"What are you doing?", sender:"John"},
//             {id:6, message:"I am studying", sender:"Jane"},
//             {id:7, message:"What are you studying?", sender:"John"},
//             {id:8, message:"I am studying computer science", sender:"Jane"},
//         ]
//         console.log(chats)
//         // const [Message, SetMessage] = useState(chats)

//         // function onNewMessage(message)
//         // {
//         //     SetMessage((OldMessages)=>
//         //         {
//         //             return[...OldMessages,message]
//         //         });
//         // }

//         return(
//             <>
//                 <div className="chatcon">
//                 {userChat.map((datas)=> <ChatMessage chats={datas}/>)}
//                 <NewMessage/>
//                 </div>
//             </>
//         )
//     }

// export default Chat