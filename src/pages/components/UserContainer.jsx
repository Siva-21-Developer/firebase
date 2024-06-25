/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import User from "./User";
import "./UserContainer.css";
import { auth, db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const UserContainer = (props) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const unsubscribe = onSnapshot(
                collection(db, "users"),
                (querySnapshot) => {
                    const usersList = querySnapshot.docs
                        .map(doc => ({ id: doc.id, ...doc.data() }))
                        .filter(userDoc => userDoc.id !== user.uid);
                    setUserData(usersList);
                },
                (error) => {
                    console.log("Error getting documents:", error);
                }
            );

            // Clean up the listener on unmount
            return () => unsubscribe();
        }


    }, []);

    
    return (
        <div className="Usercon">
            <header>
                <h3>Contact</h3>
            </header>
            <div className="user-container">
                {userData.length > 0 ? (
                    userData.map((user, index) => (
                        <User key={user.id} data={user} selFun={props.SelectFun} userValue={props.uservalue} />
                    ))
                ) : (
                    <p>No user data found.</p>
                )}
            </div>
        </div>
    );
};

export default UserContainer;


// /* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-key */
// import React, { useEffect, useState } from "react";
// import User from "./User";
// import "./UserContainer.css";
// import { auth, db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const UserContainer = () => {
//     const [userData, setUserData] = useState([]);

//     useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             const fetchUserData = async () => {
//                 try {
                    // const querySnapshot = await getDocs(collection(db, "users"));
                    // const usersList = querySnapshot.docs
                    //     .map(doc => ({ id: doc.id, ...doc.data() }))
                    //     .filter(userDoc => userDoc.id !== user.uid);
                    // setUserData(usersList);
//                 } catch (e) {
//                     console.log("Error getting documents:", e);
//                 }
//             };

//             fetchUserData();
//         }
//     }, []);

//     return (
//         <div className="Usercon">
//             <header>
//                 <h3>USERS</h3>
//             </header>
//             <div className="user-container">
//                 {userData.length > 0 ? (
//                     userData.map((user, index) => (
//                         <User key={index} data={user} />
//                     ))
//                 ) : (
//                     <p>No user data found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserContainer;


// /* eslint-disable react/jsx-key */
// import React, { useEffect, useState } from "react";
// import User from "./User";
// import "./UserContainer.css";
// import { auth, db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const UserContainer = () => {
//     const [userData, setUserData] = useState([]);

//     useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             const fetchUserData = async () => {
//                 try {
//                     const querySnapshot = await getDocs(collection(db, "users"));
//                     const usersList = querySnapshot.docs.map(doc => doc.data());
//                     setUserData(usersList);
//                 } catch (e) {
//                     console.log("Error getting documents:", e);
//                 }
//             };

//             fetchUserData();
//         }
//     }, []);

//     return (
//         <div className="Usercon">
//             <header>
//                 <h3>USERS</h3>
//             </header>
//             <div className="user-container">
//                 {userData.length > 0 ? (
//                     userData.map((user, index) => (
//                         <User key={index} data={user} />
//                     ))
//                 ) : (
//                     <p>No user data found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserContainer;


// /* eslint-disable react/jsx-key */
// import React, { useEffect, useState } from "react";
// import User from "./User";
// import "./UserContainer.css";
// import { auth, db } from "../../firebase";
// import { doc, getDoc } from "firebase/firestore";

// const UserContainer = () => {
//     const [userData, setUserData] = useState([]);

//     useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             const userDocRef = doc(db, "users", user.uid);

//             const fetchUserData = async () => {
//                 try {
//                     const docSnapshot = await getDoc(userDocRef);
//                     if (docSnapshot.exists()) {
//                         setUserData(docSnapshot.data());
//                     } else {
//                         console.log("No cached document data found.");
//                     }
//                 } catch (e) {
//                     console.log("Error getting cached document:", e);
//                 }
//             };

//             fetchUserData();
//         }
//     }, []);

//     return (
//         <div className="Usercon">
//             <header>
//                 <h3>USERS</h3>
//             </header>
//             <div className="user-container">
//                 {Array.isArray(userData) ? (
//                     userData.map((user, index) => (
//                         <User key={index} data={user} />
//                     ))
//                 ) : (
//                     <User data={userData} />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserContainer;