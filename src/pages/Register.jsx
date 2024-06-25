/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imgs from './images/Sign up.gif';

const Register = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let imageUrl = "";
            if (image) {
                const storage = getStorage();
                const storageRef = ref(storage, `images/${user.uid}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            // Create a document reference
            const userDocRef = doc(db, "users", user.uid);

            // Set the document with the user details
            await setDoc(userDocRef, {
                uid: user.uid,
                name: username,
                email: email,
                imageUrl: imageUrl,
            }); 

            console.log("User details added to Firestore with ID: ", user.uid);
        } catch (error) {
            console.error("Error creating user or adding document: ", error.code, error.message);
        }
    }

    return (
        <>
            <aside className="imgcon">
            <img src={imgs} alt="" />
            </aside>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <h2>Sign Up</h2>
                </div>
                <div className="input-box">
                    <input type="text" name="username" placeholder="Username" required value={username} onChange={handleUsernameChange} />
                </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder="Password" required value={password} onChange={handlePasswordChange} />
                </div>
                <div className="input-box">
                    <input type="email" name="email" placeholder="Email" required value={email} onChange={handleEmailChange} />
                </div>
                <div className="input-box">
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="input-button-box">
                    <input type="submit" value="Register" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </>
    );
}

export default Register;


// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
// import { getStorage, ref } from "firebase/storage";

// const Register = (props) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     }

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     }

//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Create a document reference
//             const userDocRef = doc(db, "users", user.uid);

//             // Set the document with the user details
//             await setDoc(userDocRef, {
//                 uid: user.uid,
//                 name: username,
//                 email: email,
//             }); 

//             console.log("User details added to Firestore with ID: ", user.uid);
//         } catch (error) {
//             console.error("Error creating user or adding document: ", error.code, error.message);
//         }
//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className='header'>
//                     <h2>Sign Up</h2>
//                 </div>
//                 <div className="input-box">
//                     <input type="text" name="username" placeholder="Username" required value={username} onChange={handleUsernameChange} />
//                 </div>
//                 <div className="input-box">
//                     <input type="password" name="password" placeholder="Password" required value={password} onChange={handlePasswordChange} />
//                 </div>
//                 <div className="input-box">
//                     <input type="email" name="email" placeholder="Email" required value={email} onChange={handleEmailChange} />
//                 </div>
//                 <div className="input-button-box">
//                     <input type="submit" value="Register" />
//                     <input type="reset" value="Cancel" />
//                 </div>
//             </form>
//         </>
//     );
// }

// export default Register;
