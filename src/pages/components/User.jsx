/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import "./User.css"
import img from "../images/images.png";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const User = (props) => {


    const[chatUser, setChatuser] = useState(false);

    const user = auth.currentUser;
    const createChat =(id, url, name) =>
        {
            addDoc(collection(db,"solochat"),{
            })

            
           props.selFun(id,url,name);
        }

        useEffect(()=>
        {
            if(props.userValue === props.data.uid)
                {
                    setChatuser(true);
                }
            else if(props.userValue !== props.data.uid)
                {
                    setChatuser(false);
                }
        }, [props.userValue,props.data.uid]);



    return (
        <button className={chatUser? "usercontainer active":"usercontainer"} onClick={()=>createChat(props.data.uid,props.data.imageUrl,props.data.name)}>
            <aside>

                <img 
                    src={props.data.imageUrl ? props.data.imageUrl : img} 
                    alt={`${props.data.name}'s image`} 
                />
            </aside>
            <div className="details">
                <h3>{props.data.name}</h3>
                <h4>{props.data.email}</h4>
            </div>
        </button>
    );
}

export default User;


// /* eslint-disable react/prop-types */
// import "./User.css"
// import img from "../images/images.png"

// const User = (props)=>
//     {
//         return(
//             <>
//             <div className="usercontainer">
//                 <aside>
//                     <img src={props.data.imageUrl === " " ? props.data.imageUrl : img} alt="userimage"/>
//                 </aside>
//                 <div className="details">
//                         <h3>{props.data.name}</h3>
//                         <h4>{props.data.email}</h4>
//                 </div>
//             </div>
//             </>
//         )
//     }

//     export default User