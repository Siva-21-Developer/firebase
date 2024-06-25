/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./NewMessage.css";
import { auth, db } from "../../firebase";
import { collection, addDoc, getDoc, doc, Timestamp } from "firebase/firestore"; 

const NewMessage = (props) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user logged in");
            }

            if (newMessage.trim() !== "") {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (!userDocSnap.exists()) {
                    throw new Error("User document not found");
                }

                const userData = userDocSnap.data();
                const currentDate = Timestamp.now();
                
                const chatCollectionRef = collection(db, "solochat");
                await addDoc(chatCollectionRef, {
                    text: newMessage,
                    createdAt: currentDate,
                    userId: user.uid,
                    receviverUserId: props.userId,
                    userEmail: userData.email, // including email or other user info if needed
                    userImageUrl: userData.imageUrl,
                });

                setNewMessage(""); // Clear the input after sending the message
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className="new-message-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                />
                {/* <input type="file" name="" id="" />  */}
                <button type="submit" className="btn">Send</button>
            </form>
        </div>
    );
};

export default NewMessage;


// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import "./NewMessage.css";
// import { auth, db } from "../../firebase";
// import { collection, addDoc, query, orderBy, getDocs,doc } from "firebase/firestore"; 

// const NewMessage = (props) => {
//     const [newMessage, setNewMessage] = useState(""); // Renamed to singular for clarity

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const user = auth.currentUser;
//             if (!user) {
//                 throw new Error("No user logged in");
//             }
//             const userDocRef = doc(db, "users", user.uid);
//             const querysnam =await getDocs(userDocRef);
//             const usericon = querysnam.data();
//             console.log(usericon.email);
//             // const currentDate = new Date();
//             // await addDoc(collection(db, "chat"), {
//             //     text: newMessage,
//             //     createdAt: currentDate.toISOString(),
//             //     userId: user.uid,
//             // });

//             setNewMessage(""); // Clear the input after sending the message
//                 } catch (e) {
//             console.error("Error adding document: ", e);
//         }
//     };

//     //  useEffect(() => {
//     //     const user = auth.currentUser;
//     //     if (user) {
//     //         const fetchUserMessages = async () => {
//     //             try {
//     //                 const chatQuery = query(collection(db, "chat"), orderBy("createdAt", "asc"));
//     //                 const querySnapshot = await getDocs(chatQuery);
//     //                 const userChatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     //                 props.userdatas(userChatList);
//     //             } catch (e) {
//     //                 console.log(e);
//     //             }
//     //         };
//     //         fetchUserMessages();
//     //     }
//     // }, );

//     return (
//         <div className="new-message-container">
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Message..."
//                     value={newMessage}
//                     onChange={(event) => setNewMessage(event.target.value)}
//                 />
//                 <button type="submit" className="btn">Send</button>
//             </form>
//         </div>
//     );
// };

// export default NewMessage;
