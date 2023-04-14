import React from "react";
import "./darkthemebutton.css";

function DarkThemeButton({ handleTheme, defaultChecked }) {
  return (
    <div className="dark-theme-button_container">
      <div className="dark-theme-button_icons">
        <input
          type="checkbox"
          onChange={handleTheme}
          id="darkThemeButton"
          checked={defaultChecked}
        />
      </div>
    </div>
  );
}

export default DarkThemeButton;
