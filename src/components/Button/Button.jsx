import React from 'react'
import "./button.css"

function Button({description, handleModal, className, icon}) {
  return (
    <>
    <button className={className ? `button ${className}` : "button"} onClick={handleModal}>
      {description} 
      {
        icon ? <img src={icon} /> : ""
      }
      </button>
    </>
  )
}

export default Button