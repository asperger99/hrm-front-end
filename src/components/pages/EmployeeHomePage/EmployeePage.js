import React, { useState } from "react";
// import EmployeeFeatures from "../EmployeeHomePage/EmployeeFeatures";
import Attendance from "./Attendance";
import "./EmployeePage.css";
import LeaveApplication from "./LeaveApplication";
import LoanAndBonusApplication from "./LoanAndBonusApplication";
import ProjectAssigned from "./ProjectAssigned";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory } from "react-router-dom";
import { UseStateValue } from "../../StateProvider";
import { IconButton } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
import BusinessIcon from "@material-ui/icons/Business";

////////my content////

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

function EmployeePage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();
  //////my own content///////////
  const [currentSection, setCurrentSection] = useState("Attendance");
  const [{ user }, dispatch] = UseStateValue();
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
          <i>Signed In as</i>
          <p>
            <strong>{user?.username} </strong>
          </p>
        </div>
      </div>
      <Divider />
      <List>
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
          key="Leave Application"
          onClick={() => setCurrentSection("Leave Application")}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Leave Application" />
        </ListItem>

        <ListItem
          button
          key="Loan-Bonus Application"
          onClick={() => setCurrentSection("Loan-Bonus Application")}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Loan-Bonus Application" />
        </ListItem>
        {/* <Divider />
        <ListItem
          button
          key="About Us"
          onClick={() => setCurrentSection("About Us")}
        >
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem> */}
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
        <div className="employeepage__container">
          <div className="employeepage__container__right__feed">
            {currentSection === "Leave Application" && (
              <>
                <LeaveApplication />
              </>
            )}
            {currentSection === "Loan-Bonus Application" && (
              <>
                <LoanAndBonusApplication />
              </>
            )}
            {currentSection === "Projects Assigned" && (
              <>
                <ProjectAssigned />
              </>
            )}
            {currentSection === "Attendance" && (
              <>
                <Attendance />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

EmployeePage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default EmployeePage;
