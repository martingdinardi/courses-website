import React from "react";
import "../forms-modal.css";
import "./reset-database-modal.css"
import Button from '../Button/Button'

function ResetDatabaseModal({resetDatabase}) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="reset-database-modal-body">
          <h2>Hey there! Welcome to Bliss</h2>
          <p>
            Signup or Login using <b>"test[number]@test.com"</b> as a username and <b>test </b> 
            as a password. 
          </p>
          <p>
            for example: username: <i>test1@test.com</i> password: <i>test</i>
          </p>
          <p>There are 11 teachers for use.</p>
          <p>
            After login you will be able to create new courses, delete them,
            save them in the wishlist, buy them, etc.
          </p>
          <p>
            I hope you enjoy the experience and thank you very much for be here
          </p>
          <h4>Martín</h4>
        </div>
        <div className="reset-database-button">
        <Button description={'Click here to start'} handleModal={resetDatabase}></Button>
        </div>
      </div>
    </div>
  );
}

export default ResetDatabaseModal;
