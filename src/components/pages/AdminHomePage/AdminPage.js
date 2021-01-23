import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";
import Payrolls from "./Payrolls";
import EmployeeCard from "./EmployeeCard";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import Attendance from "./Attendance";
import { UseStateValue } from "../../StateProvider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "@material-ui/core";
import Axios from "axios";
import { set } from "date-fns";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useHistory } from "react-router-dom";
import LeaveRequest from "./LeaveRequest";
import LoanAndBonus from "./LoanAndBonus";
import { createEmployeeValidate } from "../../utils/utils";

////////drawer///
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

////////prev requests/////

////////my content////

const months = [
  "January",
  "February",
  "March",
  "Aprill",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
////////////////

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AdminPage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //////my own content///////////
  const [{ employees, user }, dispatch] = UseStateValue();
  const [currentSection, setCurrentSection] = useState("Employees");
  const history = useHistory();
  const [payrollUsername, setPayrollUsername] = React.useState("");
  const [payrollMonth, setPayrollMonth] = React.useState("");
  const [payrollYear, setPayrollYear] = React.useState(null);
  const [salaryDue, setSalaryDue] = useState(null);
  const [skip, setSkip] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(null);
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const payrollData = () => {
    console.log("payroll");
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/payroll/load",
    })
      .then((res) => {
        // console.log(res);
        let temp = [];
        res?.data?.forEach((element, index) => {
          temp.push({
            id: index + 1,
            username: element.username,
            lastPaidMonth: element.lastPaidMonth,
            yearOfMonth: element.yearOfMonth,
            salaryDue: element.salaryDue,
          });
        });
        dispatch({
          type: "UPDATE_PAYROLL",
          item: temp,
        });
      })
      .catch((e) => alert(e.message));
  };

  const payRollUpdate = () => {
    if (payrollUsername == "" || payrollMonth == "" || payrollYear == null) {
      return alert("All fields are required!!");
    }
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        username: payrollUsername,
        lastPaidMonth: payrollMonth,
        yearOfMonth: payrollYear,
        salaryDue,
      },
      url: "https://shrouded-badlands-75056.herokuapp.com/payroll/update",
    })
      .then((res) => {
        console.log(res);
        if (res.data == "No user found")
          return alert("No user found as " + payrollUsername);
        alert("successfully updated Payroll.");
        payrollData();
        setPayrollUsername("");
        setPayrollMonth("");
        setPayrollYear("");
        setSalaryDue("");
      })
      .catch((e) => {
        console.log("e", e);
        alert(e.message);
      });
  };

  const loadAll = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/employees/all",
    })
      .then((response) => {
        console.log(response);
        // setSkip(skip + 10);
        let temp = response.data;
        dispatch({
          type: "ADD_TO_EMPLOYEES",
          item: temp.reverse(),
        });
      })
      .catch((e) => alert(e.message));
  };
  useEffect(() => {
    loadAll();
  }, []);

  const handleSignOut = () => {
    console.log("called");
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/logout",
    })
      .then((res) => {
        if (res.data === "successfull") {
          dispatch({
            type: "UPDATE_USER",
            item: null,
          });
          localStorage.clear();
          history.push("/");
        }
      })
      .catch((e) => alert(e.message));
  };

  const handleSearch = (id, department, designation, fullName) => {
    const obj = {};
    if (id != "") obj._id = id;
    if (department != "") obj.department = department;
    if (designation != "") obj.designation = designation;
    if (fullName != "") obj.fullName = fullName;
    if (Object.keys(obj).length == 0) {
      //alert("Atleast one field is required");
      return loadAll();
    }

    // console.log(obj);
    Axios({
      method: "POST",
      withCredentials: true,
      data: obj,
      url: "https://shrouded-badlands-75056.herokuapp.com/employees/query",
    })
      .then((response) => {
        let temp = response.data;
        dispatch({
          type: "ADD_TO_EMPLOYEES",
          item: temp.reverse(),
        });
      })
      .catch((e) => alert(e.message));
  };

  const handleCreate = () => {
    if (
      !createEmployeeValidate(
        fullName,
        username,
        isAdmin,
        gender,
        dob,
        email,
        contact,
        password,
        designation,
        department,
        salary,
        city,
        state,
        pincode
      )
    ) {
      return;
    }

    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        fullName,
        username,
        isAdmin,
        gender,
        dob,
        email,
        contact,
        password,
        designation,
        department,
        salary,
        city,
        state,
        pincode,
      },
      url: "https://shrouded-badlands-75056.herokuapp.com/employees/new",
    })
      .then((res) => {
        // console.log(res?.data);
        alert(res?.data);

        setOpen(false);
      })
      .catch((e) => alert(e.message));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className="update">
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
        <span>username: </span>{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>password: </span>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </h1>
      <h1>
        <span>DOB: </span>{" "}
        <input
          type="date"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
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
      <FormControl className={classes.formControl} style={{ width: "95%" }}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
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

      <FormControl className={classes.formControl} style={{ width: "95%" }}>
        <InputLabel id="demo-simple-select-label">Admin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={designation}
          required
          onChange={(event) => setIsAdmin(event.target.value)}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
        </Select>
      </FormControl>
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
        onClick={() => handleCreate()}
      >
        Create
      </Button>
    </div>
  );

  //////////////

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <div className="avatar__container">
        <Avatar src="/broken-image.jpg" className="avatar__icon" />
        <div className="avatar__details">
          <i>
            Signed In as <strong>Admin</strong>
          </i>
          <p>
            <strong>{user?.username}</strong>
          </p>
        </div>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key="Employees"
          onClick={() => setCurrentSection("Employees")}
        >
          <ListItemIcon>
            <PermContactCalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem
          button
          key="Attendance"
          onClick={() => setCurrentSection("Attendance")}
        >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
        <ListItem
          button
          key="Payrolls"
          onClick={() => setCurrentSection("Payrolls")}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Payrolls" />
        </ListItem>
        <ListItem
          button
          key="Leave Requests"
          onClick={() => setCurrentSection("Leave Requests")}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Leave Requests" />
        </ListItem>
        <ListItem
          button
          key="Loan & Bonus Requests"
          onClick={() => setCurrentSection("Loan & Bonus Requests")}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Loan & Bonus Requests" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Sign Out" onClick={() => handleSignOut()}>
          <ListItemIcon>
            <ErrorOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currentSection}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="adminpage__container">
          <Modal
            className="modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>

          <div className="adminpage__container__right">
            <div className="adminpage__container__right__feed">
              {currentSection === "Payrolls" && (
                <>
                  <Payrolls />
                  <div className="payrolls__update">
                    <h3>Update Or Start payroll for an employee</h3>
                    <input
                      type="text"
                      placeholder="username"
                      value={payrollUsername}
                      onChange={(e) => setPayrollUsername(e.target.value)}
                    />
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "290px" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Month Paid Upto
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payrollMonth}
                        onChange={(e) => setPayrollMonth(e.target.value)}
                      >
                        {months.map((m) => (
                          <MenuItem value={m}>{m}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <input
                      type="number"
                      placeholder="year for above Month"
                      value={payrollYear}
                      onChange={(e) => setPayrollYear(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Salary Due"
                      value={salaryDue}
                      onChange={(e) => setSalaryDue(e.target.value)}
                    />
                    <Button
                      className="payrolls__update__button"
                      variant="contained"
                      color="primary"
                      onClick={() => payRollUpdate()}
                    >
                      Update
                    </Button>
                  </div>
                </>
              )}
              {currentSection === "Employees" && (
                <>
                  <div className="employee__search__container">
                    <input
                      type="text"
                      placeholder="Employee ID"
                      onChange={(e) => setSearchId(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      onChange={(e) => setSearchDepartment(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      onChange={(e) => setSearchDesignation(e.target.value)}
                    />
                    <IconButton
                      onClick={() =>
                        handleSearch(
                          searchId,
                          searchDepartment,
                          searchDesignation,
                          searchName
                        )
                      }
                      style={{
                        borderRight: "1px solid lightgray",
                        marginRight: "8px",
                      }}
                    >
                      <YoutubeSearchedForIcon />
                    </IconButton>
                    <IconButton
                      style={{
                        borderLeft: "1px solid lightgray",
                        marginRight: "8px",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>

                  {employees?.length === 0 && (
                    <img
                      src="https://media3.giphy.com/media/PUYgk3wpNk0WA/200w.webp?cid=ecf05e47a4f84655b9ad82fb99b59e2b5e309eecf23c3498&rid=200w.webp"
                      alt=""
                    />
                  )}

                  {employees?.map((e) => (
                    <EmployeeCard e={e} key={e._id} />
                  ))}
                  {/* {(employees?.length > 0 || skip > 0) && (
                <div className="employee__pagination">
                  <IconButton
                    disabled={!(skip > 0)}
                    onClick={() => setSkip(skip - 10)}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    disabled={employees?.length < 10}
                    // onClick={() => setSkip(skip - 10)}
                    onClick={() => setSkip(skip + 10)}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              )} */}
                </>
              )}
              {currentSection === "Leave Requests" && (
                <div className="leaverequest__container">
                  <LeaveRequest />
                </div>
              )}
              {currentSection === "Loan & Bonus Requests" && (
                <div className="loanrequest__container">
                  <LoanAndBonus />
                </div>
              )}
              {currentSection === "Attendance" && (
                <div className="attendance__container">
                  <Attendance />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

AdminPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminPage;
