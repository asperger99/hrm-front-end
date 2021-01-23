import React from "react";
import "./ProjectAssigned.css";

function ProjectAssigned() {
  return (
    <div className="project">
      <div className="project__image">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/1087/1087902.svg"
          alt=""
        />
      </div>
      <div className="project__info">
        <p>
          <strong>Project ID : </strong> 1234
        </p>
        <p>
          <strong>Project Name : </strong> stackhack
        </p>
        <p>
          <strong>Starting date : </strong> 12/2/2002
        </p>
        <p>
          <strong>Project status : </strong> in progress
        </p>
      </div>
      <div className="project__team">
        <p>
          <strong>Project Leader : </strong> Mohit kumar
        </p>
        <p>
          <strong>Project Team : </strong>You, Rohan Singh, Raju Singh, Kishan
          Kumar
        </p>
      </div>
    </div>
  );
}

export default ProjectAssigned;
