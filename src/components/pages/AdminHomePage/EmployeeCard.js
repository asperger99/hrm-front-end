import React, { useState } from "react";
import "./EmployeeCard.css";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import axios from "../axios";
import employees from "../../reducer";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { UseStateValue } from "../../StateProvider";
import Axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { updateValidate } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EmployeeCard({ e }) {
  const [{ employees }, dispatch] = UseStateValue();
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const [fullName, setFullName] = useState(e.fullName);
  const [gender, setGender] = useState(e.gender);
  const [dob, setDob] = useState(e.dob);
  const [email, setEmail] = useState(e.email);
  const [contact, setContact] = useState(e.contact);
  const [salary, setSalary] = useState(e.salary);
  const [city, setCity] = useState(e.city);
  const [state, setState] = useState(e.state);
  const [pincode, setPincode] = useState(e.pincode);
  const [department, setDepartment] = useState(e.department);
  const [designation, setDesignation] = useState(e.designation);
  const [isAdmin, setIsAdmin] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const updateEmployee = () => {
    let obj = {
      fullName,
      email,
      gender,
      dob,
      contact,
      salary,
      city,
      state,
      pincode,
      department,
      designation,
      isAdmin,
    };
    if (
      !updateValidate(
        fullName,
        email,
        gender,
        dob,
        contact,
        salary,
        city,
        state,
        pincode,
        department,
        designation,
        isAdmin
      )
    )
      return;
    Axios({
      method: "POST",
      withCredentials: true,
      data: obj,
      url: `https://shrouded-badlands-75056.herokuapp.com/employees/update/${e._id}`,
    })
      .then((response) => {
        setOpen(false);
        alert("successfully updated!!");

        // console.log(response);
        // axios
        //   .get("/employees/all", { params: { limit: 10, skip: 0 } })
        //   .then((response) => {
        //     dispatch({
        //       type: "ADD_TO_EMPLOYEES",
        //       item: response.data,
        //     });
        //   })
        //   .catch((e) => alert(e.message));
      })
      .catch((e) => alert(e.message));
  };
  const deleteEmployee = () => {
    const temp = prompt("enter Employee Id you want to delete..");
    if (temp === "" || temp == null) {
      return alert("please enter a valid Employee Id");
    }
    axios
      .delete("/employees/delete", { params: { id: temp } })
      .then((response) => {
        alert("successfully deleted!!");
        // axios
        //   .get("/employees/all", { params: { limit: 10, skip: 0 } })
        //   .then((response) => {
        //     const temp = response.data;
        //     dispatch({
        //       type: "ADD_TO_EMPLOYEES",
        //       item: temp.reverse(),
        //     });
        //   })
        //   .catch((e) => alert(e.message));
      })
      .catch((e) => alert(e.message));
  };

  const body = (
    <div className="update">
      {/* <h1>
        <span>Employee Id: </span> <input type="number" value={e?._id} />
      </h1> */}
      <h1>
        <span>Name: </span>{" "}
        <input
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
      </h1>

      <h1>
        <span>DOB: </span>{" "}
        <input
          type="date"
          value={new Date(e.dob).toUTCString().substr(0, 10)}
          onChange={(e) => {
            setDob(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>gender: </span>{" "}
        <input
          type="text"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>contact: </span>{" "}
        <input
          type="number"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>email: </span>{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </h1>
      <h1>
        <FormControl className={classes.formControl} style={{ width: "95%" }}>
          <InputLabel id="demo-simple-select-label">make admin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isAdmin}
            required
            onChange={(event) => setIsAdmin(event.target.value)}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </h1>

      <h1>
        <span>Department: </span>
        <input
          type="text"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>Designation: </span>
        <input
          type="text"
          value={designation}
          onChange={(e) => {
            setDesignation(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>Salary: </span>{" "}
        <input
          type="number"
          value={salary}
          onChange={(e) => {
            setSalary(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>city: </span>{" "}
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>state: </span>
        <input
          type="text"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>pincode: </span>{" "}
        <input
          type="number"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
          }}
        />
      </h1>
      <Button
        variant="contained"
        color="primary"
        className="update__button"
        onClick={() => updateEmployee()}
      >
        Update
      </Button>
    </div>
  );

  return (
    <div className="employee">
      <div className="employeecard__container">
        <Modal
          className="modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>

        <div className="employeecard__container__avatar">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt=""
          />
        </div>
        <div className="employeecard__container__details">
          <h1>
            <span>Employee Id: </span> {e._id}
          </h1>
          <h1>
            <span>Name: </span> {e.fullName}
          </h1>

          <h1>
            <span>contact: </span> {e.contact}
          </h1>
          <h1>
            <span>email: </span> {e.email}
          </h1>

          <IconButton
            onClick={() => setMore(true)}
            style={{ display: !more ? "block" : "none" }}
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            onClick={() => setMore(false)}
            style={{ display: more ? "block" : "none" }}
          >
            <ExpandLessIcon />
          </IconButton>
          <div
            className="employeecard__container__moredetails"
            style={{ display: more ? "block" : "none" }}
          >
            <h1>
              <span>dob: </span>{" "}
              {`${new Date(e.dob).getDate()}/${
                new Date(e.dob).getMonth(e.dob) + 1
              }/${new Date(e.dob).getFullYear()}`}
            </h1>
            <h1>
              <span>Department: </span> {e.department}
            </h1>
            <h1>
              <span>Designation: </span> {e.designation}
            </h1>
            <h1>
              <span>Salary: </span> {e.salary}
            </h1>
            <h1>
              <span>city: </span> {e.city}
            </h1>
            <h1>
              <span>state: </span> {e.state}
            </h1>
            <h1>
              <span>pincode: </span> {e.pincode}
            </h1>
            <div className="create__delete__icon">
              <IconButton
                onClick={() => setOpen(true)}
                style={{
                  borderRight: "1px solid lightgray",
                  marginRight: "8px",
                }}
              >
                <CreateIcon className="employee__create__icon" />
              </IconButton>
              <IconButton
                onClick={() => deleteEmployee()}
                style={{
                  borderLeft: "1px solid lightgray",
                  marginRight: "8px",
                }}
              >
                <DeleteForeverIcon className="employee__delete__icon" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
