import React from "react";
import Chip from "@material-ui/core/Chip";
import TimerIcon from "@material-ui/icons/Timer";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import "./PrevLeaveReq.css";

function PrevLeaveReq({ data }) {
  const d1 = new Date(data?.from);
  const d2 = new Date(data?.to);
  return (
    <div className="prev__leaverequest">
      <div className="prev__leaverequest__date">
        {/* <span>
          <strong>Employee ID : </strong>
          {data?._id}
        </span> */}
        <span>
          <strong>From : </strong>{" "}
          {`${d1?.getDate()}/${d1?.getMonth()}/${d1?.getFullYear()}`}
        </span>
        <span>
          <strong>To : </strong>{" "}
          {`${d2?.getDate()}/${d2?.getMonth()}/${d2?.getFullYear()}`}
        </span>
      </div>
      <div className="prev__leaverequest__reason">
        <strong>Reason : </strong>
        <p>{data.reason}</p>
      </div>
      <div className="prev__leaverequest__action">
        {data.status === "pending" && (
          <Chip label={data?.status} icon={<TimerIcon />} />
        )}
        {data?.status === "accepted" && (
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

export default PrevLeaveReq;
