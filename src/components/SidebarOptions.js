import React from "react";
import "./SidebarOptions.css";

function SidebarOptions({ option, Icon, setCurrentSection }) {
  return (
    <>
      <div
        className="sidebaroptions__container"
        onClick={() => setCurrentSection(option)}
      >
        <Icon className="sidebaroptions__container__Icon" />
        <p className="sidebaroptions__name">{option}</p>
      </div>
    </>
  );
}

export default SidebarOptions;
