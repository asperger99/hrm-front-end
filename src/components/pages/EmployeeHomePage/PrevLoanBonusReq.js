import React from "react";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import TimerIcon from "@material-ui/icons/Timer";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import "./PrevLoanBonusReq.css";
function PrevLoanBonusReq({ data }) {
  const d = new Date(data.createdAt);

  return (
    <div className="prev__loanrequest">
      <div className="prev__loanrequest__date">
        <span>
          <strong>Date: </strong>{" "}
          {`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}
        </span>
      </div>
      <div className="prev__loanrequest__reason">
        <strong>Application Body : </strong>
        <p>{data.application}</p>
      </div>
      <div className="prev__loanrequest__action">
        {data.status === "pending" && (
          <Chip label={data.status} icon={<TimerIcon />} />
        )}
        {data.status === "accepted" && (
          <Chip
            icon={<ThumbUpIcon />}
            label="Accepted"
            color="primary"
            variant="outlined"
          />
        )}
        {data.status === "rejected" && (
          <Chip icon={<ThumbDownIcon />} label="Rejected" color="secondary" />
        )}
      </div>
    </div>
  );
}

export default PrevLoanBonusReq;
