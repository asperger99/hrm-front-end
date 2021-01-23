import React, { useState } from "react";
import "./LandingPage.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Redirect, Link, useHistory } from "react-router-dom";
import { UseStateValue } from "./StateProvider";
import Axios from "axios";
import { signInValidate, signUpValidate } from "./utils/utils";

const dep = ["CSE", "IT", "ECE"];
const des = ["POST 1", "POST 2", "POST 3"];
const cit = ["city 1", "city 2", "city 3"];
const sta = ["state 1", "state 2", "state 3"];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function LandingPage() {
  const [{ user }, dispatch] = UseStateValue();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState(null);
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const handleCloseSignIn = () => {
    setSignInOpen(false);
  };
  const handleCloseSignUp = () => {
    setSignUpOpen(false);
  };

  const handleSignIn = () => {
    if (!signInValidate(username, password)) return;
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/login",
    })
      .then((res) => {
        if (res.data === "No User Exists") {
          return alert(res.data);
        }
        localStorage.setItem("user", res.data); //////////////////added 1
        dispatch({
          type: "UPDATE_USER",
          item: res.data,
        });
        // console.log("user", user);
        if (res.data) {
          if (res.data?.isAdmin) history.push("/admin");
          else history.push("/employee");
        }
      })
      .catch((e) => alert(e.message));
    // console.log(user);
  };
  const handleSignUp = () => {
    if (password != confirmPassword)
      return alert("password and confirmed password are not same!!");

    if (
      !signUpValidate(
        fullName,
        username,
        password,
        dob,
        gender,
        email,
        designation,
        department,
        city,
        state,
        pincode,
        contact
      )
    )
      return;
    const obj = {
      fullName,
      username,
      password,
      dob,
      gender,
      email,
      designation,
      department,
      city,
      state,
      pincode,
      contact,
    };
    Axios({
      method: "POST",
      data: obj,
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/register",
    })
      .then((res) => {
        console.log("register-->", res);
        handleCloseSignUp();
        alert("successfully signed up, go back and login to proceed.");
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  };

  const body1 = (
    <div className="signin__container">
      <div className="signin__container__elements">
        <input
          type="text"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSignIn()}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
  const body2 = (
    <div className="signup__container">
      <div className="signup__container__personaldetails">
        <input
          type="text"
          placeholder="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="full name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <input
          type="number"
          placeholder="contact"
          required
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
        <input
          type="date"
          placeholder="D.O.B"
          required
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
        <FormControl className={classes.formControl} style={{ width: "290px" }}>
          <InputLabel id="demo-simple-select-label">gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            required
            onChange={(event) => setGender(event.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "290px" }}>
          <InputLabel id="demo-simple-select-label">department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={department}
            required
            onChange={(event) => setDepartment(event.target.value)}
          >
            {dep.map((d) => (
              <MenuItem value={d}>{d}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "290px" }}>
          <InputLabel id="demo-simple-select-label">designation</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={designation}
            required
            onChange={(event) => setDesignation(event.target.value)}
          >
            {des.map((d) => (
              <MenuItem value={d}>{d}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "290px" }}>
          <InputLabel id="demo-simple-select-label">your city</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            required
            onChange={(event) => setCity(event.target.value)}
          >
            {cit.map((c) => (
              <MenuItem value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "290px" }}>
          <InputLabel id="demo-simple-select-label">your state</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            required
            onChange={(event) => setState(event.target.value)}
          >
            {sta.map((s) => (
              <MenuItem value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="number"
          placeholder="pincode"
          value={pincode}
          required
          onChange={(e) => setPincode(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="signup__container__personaldetails__button"
          onClick={(e) => handleSignUp(e)}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
  //  {!user ? <Redirect to="/dashboard" /> : null}
  return (
    <>
      <div>
        <Modal
          className="modal"
          open={signInOpen}
          onClose={handleCloseSignIn}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body1}
        </Modal>
        <Modal
          className="modal"
          open={signUpOpen}
          onClose={handleCloseSignUp}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body2}
        </Modal>
        <div className="landingpage__container">
          <div className="landingpage__container__image">
            <img
              src="https://images.pexels.com/photos/611328/pexels-photo-611328.jpeg"
              alt=""
            />
            <div className="landingpage__container__content">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSignUpOpen(true)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
