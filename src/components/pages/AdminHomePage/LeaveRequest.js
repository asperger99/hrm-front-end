import React, { useState, useEffect } from "react";
import "./LeaveRequest.css";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function LeaveRequest() {
  const [pendingLeave, setPendingLeave] = useState([]);

  const classes = useStyles();

  const loadPrevLeave = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/leavereq/load",
    })
      .then((res) => {
        let temp = res.data?.filter((e) => e.status == "pending");
        setPendingLeave(temp);
        // console.log("response=>", res.data);
        // console.log("temp=>", temp);
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    loadPrevLeave();
  }, []);

  const handleClick = (action, id) => {
    // alert(action + " " + id);
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id, action },
      url: "https://shrouded-badlands-75056.herokuapp.com/leavereq/action",
    })
      .then((res) => {
        // console.log(res);
        alert("Marked as " + action);
        loadPrevLeave();
      })
      .catch((e) => alert(e.message));
  };
  return (
    <>
      <h2> Total Applications : {pendingLeave?.length} </h2>

      {pendingLeave?.map((e) => {
        const d1 = new Date(e.from);
        const d2 = new Date(e.to);
        const d3 = new Date(e.createdAt);
        return (
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Application from : {e.username}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="leaverequest">
                    <div className="leaverequest__employee">
                      <span>
                        <strong> Application Date: </strong>{" "}
                        {`${d3?.getDate()}/${
                          d3?.getMonth() + 1
                        }/${d3?.getFullYear()}`}
                      </span>
                      <span>
                        <strong>From : </strong>{" "}
                        {`${d1?.getDate()}/${
                          d1?.getMonth() + 1
                        }/${d1?.getFullYear()}`}
                      </span>
                      <span>
                        <strong>To : </strong>{" "}
                        {`${d2?.getDate()}/${
                          d2?.getMonth() + 1
                        }/${d2?.getFullYear()}`}
                      </span>
                    </div>
                    <div className="leaverequest__reason">
                      <strong>Reason : </strong>
                      <p>{e.reason}</p>
                    </div>
                    <div className="leaverequest__action">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClick("accepted", e._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleClick("rejected", e._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </>
  );
}

export default LeaveRequest;
