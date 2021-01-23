import React, { useState } from "react";
import "./Attendance.css";
import Button from "@material-ui/core/Button";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import Axios from "axios";
import { set } from "date-fns";

function Attendance() {
  const [showSearch, setShowSearch] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [present, setPresent] = useState([]);
  const [presentInRange, setPresentInRange] = useState([]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const handleShowAttendance = () => {
    if (employeeId === null) {
      return alert("enter employee id...");
    }
    Axios({
      method: "POST",
      withCredentials: true,
      url: `https://shrouded-badlands-75056.herokuapp.com/employees/search/${employeeId}`,
    })
      .then((res) => {
        // setPresent(res.data.presentOn);
        const st = new Date(startDate);
        const ed = new Date(endDate);
        const d2 = new Date();
        const temp = res.data.presentOn?.filter((d) => {
          const t = new Date(d);
          if (
            t.getDate() == ed.getDate() &&
            t.getMonth() == ed.getMonth() &&
            t.getFullYear() == ed.getFullYear()
          ) {
            return true;
          }
          if (
            t.getDate() == st.getDate() &&
            t.getMonth() == st.getMonth() &&
            t.getFullYear() == st.getFullYear()
          ) {
            return true;
          }
          return t.getTime() >= st.getTime() && t.getTime() <= ed.getTime();
        });
        setPresentInRange(temp);
        console.log("temp--->", temp);
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="attandance__container">
      <input
        type="text"
        placeholder="Enter valid Employee Id"
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <Button
        onClick={() => setShowSearch(!showSearch)}
        variant="outlined"
        color="primary"
        className="attendance__daterange__button"
        // disabled={employeeId === null}
      >
        {showSearch === false ? "Select Date-Range" : "hide"}
      </Button>
      {showSearch && (
        <div className="daterange__container">
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
          <Button
            variant="outlined"
            color="primary"
            className="attendance__daterange__button"
            onClick={() => handleShowAttendance()}
          >
            See Attendance
          </Button>
        </div>
      )}
      <div className="show__attendance">
        <p>No of days employee was present on : {presentInRange?.length}</p>
        <div className="show__attendance__dates">
          {presentInRange?.map((d) => {
            const x = new Date(d);
            return (
              <div className="dates">
                <span>
                  {x.getDate()}/{x.getMonth() + 1}/{x.getFullYear()}
                </span>
                <span>Present</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Attendance;
