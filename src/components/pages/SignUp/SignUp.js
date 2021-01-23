import React from "react";
import LandingPage from "../../LandingPage";
import { UseStateValue } from "../../StateProvider";
import { Redirect, Link } from "react-router-dom";

function SignUp() {
  const [{ user }, dispatch] = UseStateValue();

  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default SignUp;
