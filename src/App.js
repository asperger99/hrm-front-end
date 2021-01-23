import React, { useEffect } from "react";
import SignUp from "./components/pages/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from "./components/pages/AdminHomePage/AdminPage";
import EmployeePage from "./components/pages/EmployeeHomePage/EmployeePage";
import { UseStateValue } from "./components/StateProvider";
import Axios from "axios";

function App() {
  const [{ user }, dispatch] = UseStateValue();
  useEffect(() => {
    // Axios({
    //   method: "GET",
    //   withCredentials: true,
    //   url: "https://shrouded-badlands-75056.herokuapp.com/user",
    // })
    //   .then((res) => {
    //     dispatch({
    //       type: "UPDATE_USER",
    //       item: res.data,
    //     });
    //   })
    //   .catch((e) => console.log(e.message));
    // const loggedInUser = localStorage.getItem("user"); ////////added 2
    // if (loggedInUser) {
    //   const foundUser = JSON.parse(loggedInUser);
    //   console.log("lgu----->>>", loggedInUser);
    //   dispatch({
    //     type: "UPDATE_USER",
    //     item: foundUser,
    //   });
    // }
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/employee"
          exact
          component={user?.isAdmin === false ? EmployeePage : SignUp}
        />
        <Route
          path="/admin"
          exact
          component={user?.isAdmin ? AdminPage : SignUp}
        />
        <Route path="/" exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
