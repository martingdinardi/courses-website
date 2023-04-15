import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import "./layout.css"
import { useLocation } from "react-router-dom";
import CategoriesModal from '../CategoriesModal/CategoriesModal';

function Layout({children}) {

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <>
    <Navbar links={["Categories", "Blog", "PRO"]}/>
    <div className={path === "user" ? "" : "layout-main"}>
    {children}
    </div>
    <Footer />
    </>
  )
}

export default Layout