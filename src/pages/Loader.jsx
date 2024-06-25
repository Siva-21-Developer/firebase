import { useState } from "react";
import "./Loader.css";


const Loader = ()=>
    {

        const [showtext, setshowText] = useState(false);

        setTimeout(()=>
        {
            setshowText(true)
        },2000)

        return(
            <>
            <div className="lod-con">
            {
                showtext?
                   <h1 className={showtext?'h1 active':"h1"}>Let's Connect the World</h1> :
                <div className="loader">
                </div>
            }
            </div>
            </>
        )
    }


export default Loader