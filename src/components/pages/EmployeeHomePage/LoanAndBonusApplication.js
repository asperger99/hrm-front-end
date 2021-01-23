import React, { useState, useEffect } from "react";
import "./LoanAndBonusApplication.css";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import Axios from "axios";
import { UseStateValue } from "../../StateProvider";
import PrevLoanBonusReq from "./PrevLoanBonusReq";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function LoanAndBonusApplication() {
  const [application, setApplication] = useState("");
  const [prevApplication, setPrevApplication] = useState([]);
  const [{ user }, dispatch] = UseStateValue();
  const classes = useStyles();

  useEffect(() => {
    sync();
  }, []);
  const sync = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `https://shrouded-badlands-75056.herokuapp.com/loanbonusreq/load/${user?.username}`,
    })
      .then((res) => {
        console.log(res.data);
        const t = res.data;
        setPrevApplication(t.reverse());
      })
      .catch((e) => alert(e.message));
  };
  const handleClick = () => {
    if (application === "") {
      return alert("write a proper application!!");
    }

    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        application,
        username: user?.username,
      },
      url: "https://shrouded-badlands-75056.herokuapp.com/loanbonusreq/create",
    })
      .then((response) => {
        console.log(response);
        setApplication("");
        alert("successfully placed your request.");
        sync();
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="LoanAndBonusApplication__container">
      <div className="loanandbonusapplication">
        <h1>Ask for Loan Or Bonus:</h1>
        <form>
          {/* <label for="w3review">Reason:</label> */}
          <span>Application : </span>
          <textarea
            id="w3review"
            name="w3review"
            rows="10"
            cols="40"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          ></textarea>

          <Button
            disabled={application.length <= 0}
            variant="contained"
            color="primary"
            onClick={() => {
              handleClick();
            }}
          >
            submit
          </Button>
        </form>
      </div>
      <div className="previous__requests">
        {/* <p>Previous Requests:</p> */}
        {prevApplication.map((a, index) => (
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Previous Application {index + 1}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <PrevLoanBonusReq data={a} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoanAndBonusApplication;
