import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Navbar from "../components/Navbar/Navbar";
import { getUser } from "../utils/apiConfig";
import "./user.css";

function User() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const user_id = location.pathname.split("/")[2];

  const fetchUser = async () => {
    const res = await getUser(user_id);
    if (res.status == 200) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    try {
      fetchUser();
      window.scrollTo({top: 0});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
    <Navbar links={["Categories", "Projects", "PRO", "Blog", "Bliss Live"]} />
    <Main user={user}/>
    <Footer />
    </>
  );
}

export default User;
