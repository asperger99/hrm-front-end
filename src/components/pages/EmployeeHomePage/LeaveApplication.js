import React, { useState, useEffect } from "react";
import "./LeaveApplication.css";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { UseStateValue } from "../../StateProvider";
import PrevLeaveReq from "./PrevLeaveReq";
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

function LeaveApplication() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [{ user }, dispatch] = UseStateValue();
  const [reason, setReason] = useState("");
  const [prevReq, setPrevReq] = useState([]);
  const classes = useStyles();

  const loadPrevRequests = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `https://shrouded-badlands-75056.herokuapp.com/leavereq/load/${user?.username}`,
    })
      .then((res) => {
        const t = res.data;
        setPrevReq(t.reverse());

        console.log(res.data);
      })
      .catch((e) => alert(e.message));
  };
  useEffect(() => {
    loadPrevRequests();
  }, []);

  const handleClick = () => {
    const d1 = new Date(from);
    const d2 = new Date();

    if (
      from > to ||
      (d1.getDate() < d2.getDate() &&
        d1.getMonth() == d2.getMonth() &&
        d1.getFullYear() == d2.getFullYear())
    ) {
      return alert("Choose date correctly.");
    }
    if (from === null || to === null || reason === "") {
      return alert("Each field is required.");
    }
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        from,
        to,
        reason,
        username: user?.username,
      },
      url: "https://shrouded-badlands-75056.herokuapp.com/leavereq/create",
    })
      .then((response) => {
        console.log(response);
        alert("successfully placed the leave request.");
        setFrom(null);
        setTo(null);
        setReason("");
        loadPrevRequests();
      })
      .catch((e) => alert(e.message));
  };
  return (
    <>
      <div className="leaveapplication">
        <h1>Ask for leave:</h1>
        <form>
          <strong>From: </strong>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <strong>To: </strong>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          {/* <label for="w3review">Reason:</label> */}
          <strong>Reason: </strong>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="40"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>

          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => handleClick()}
          >
            submit
          </Button>
        </form>
      </div>
      <div className="prevReq">
        {prevReq.map((a, index) => (
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Previous Request {index + 1}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <PrevLeaveReq data={a} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
}

export default LeaveApplication;

{
  /* <PrevLeaveReq data={a} /> */
}
