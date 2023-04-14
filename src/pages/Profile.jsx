import Navbar from '../components/Navbar/Navbar'
import Main from '../components/Main/Main'
import Footer from '../components/Footer/Footer'
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext"

function Profile() {

  const { strUser } = useContext(UserContext);
  const user = strUser ? JSON.parse(strUser) : " ";

  return (<>
  <Navbar links={["Statments", "Headings", "Comments", "Account", "Help"]}/>
  <Main user={user}/>
  <Footer />
  </>
  )
}

export default Profile