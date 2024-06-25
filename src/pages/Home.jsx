import "./Home.css"
import UserContainer from "./components/UserContainer"
import Chat from "./components/Chat"
import CurrentUserDetails from "./components/CurrentUserDetails";
import { useState } from "react";
import Loader from "./Loader";

const Home = () => {
    const [value, setValue] = useState('');
    const [loader, setLoader] = useState(true);
    const [chatuserdetails, setchatusername] = useState('');
    const [chatuserimg, setchatuserimg] = useState('');

    const chatSelect = (id,url,name) => {
        setValue(id);
        setchatusername(name);
        setchatuserimg(url);
    }


    setTimeout(()=>
    {
        setLoader(false);
    }, 5000)
    

    return (
        <>{
            loader? <Loader /> :
            <div className="chat-container">
                <UserContainer SelectFun={chatSelect} uservalue={value} />
                <Chat userId={value}  userdetails={chatuserdetails} userimg={chatuserimg}/>
                <CurrentUserDetails />
            </div>
        }
        </>
    );
}

export default Home;
