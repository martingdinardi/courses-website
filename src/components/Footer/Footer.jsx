import React, {useContext, useEffect, useState} from "react";
import "./footer.css"
import logo from "../../assets/logo.png"
import DarkThemeButton from '../DarkThemeButton/DarkThemeButton'
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Footer() {

  const {theme, setTheme} = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("theme")){
      if(localStorage.getItem("theme") === "dark"){
        setTheme("dark");
        setChecked(true);
      }else{
        setTheme("light");
      }
    }else{
      localStorage.setItem("theme", "light")
    }
  }, [])

  const handleTheme = () => {
    if(theme === "dark"){
      setTheme("light");
      localStorage.setItem("theme", "light");
    }else{
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
    setChecked(prevSt => !prevSt)
  }

  return (
    <div className='footer-container'>
        <div className="footer-developer-sign-logo">
        <Link to="/">
            <img src={logo} alt="App Logo" />
        </Link>
            <p>© Martin Gamboa Dinardi, 2022.</p>
        </div>
        <div className="footer-dark-mode">
            <DarkThemeButton defaultChecked={checked} handleTheme={handleTheme}/>
        </div>
    </div>
  )
}

export default Footer