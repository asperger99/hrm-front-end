import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./LoanAndBonus.css";
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

function LoanAndBonus() {
  const [pendingLoan, setPendingLoan] = useState([]);
  const classes = useStyles();

  const loadPrevLoan = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/loanbonusreq/load",
    })
      .then((res) => {
        let temp = res.data?.filter((e) => e.status == "pending");
        setPendingLoan(temp);
        console.log("response=>", res.data);
        console.log("temp=>", temp);
      })
      .catch((e) => alert(e.message));
  };

  const handleClick = (id, action) => {
    // alert(action + " " + id);
    Axios({
      method: "POST",
      withCredentials: true,
      data: { id, action },
      url: "https://shrouded-badlands-75056.herokuapp.com/loanbonusreq/action",
    })
      .then((res) => {
        // console.log(res);
        alert("Marked as " + action);
        loadPrevLoan();
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    loadPrevLoan();
  }, []);

  return (
    <>
      <h2>Total Applications : {pendingLoan?.length}</h2>
      {pendingLoan.map((e) => {
        const d1 = new Date(e.createdAt);
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
                  <div className="loanrequest">
                    <div className="loanrequest__employee">
                      Application Date:{" "}
                      {`${d1?.getDate()}/${
                        d1?.getMonth() + 1
                      }/${d1?.getFullYear()}`}
                    </div>
                    <div className="loanrequest__reason">
                      <strong>Application Body : </strong>
                      <p>{e.application}</p>
                    </div>
                    <div className="loanrequest__action">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClick(e._id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleClick(e._id, "rejected")}
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

export default LoanAndBonus;
