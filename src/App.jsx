import { useState, useEffect } from 'react'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Loader from './pages/Loader';


function App() {
  
  const [isUser, setIsUser] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // To track if auth state has been checked

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
      setAuthChecked(true); // Set this to true once the auth state has been checked
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return <Loader/>; // Optionally, show a loading indicator while checking auth state
  }

  return (
    <div>
      {isUser ? <Home /> : <Auth />}
    </div>
  );
}

export default App;
