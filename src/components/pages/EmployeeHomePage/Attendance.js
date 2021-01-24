import React, { useState, useEffect } from "react";
import "./Attendance.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "../axios";
import { DataGrid } from "@material-ui/data-grid";
import { UseStateValue } from "../../StateProvider";
import Axios from "axios";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

function Attendance() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [{ user }, dispatch] = UseStateValue();
  const [showSearch, setShowSearch] = useState(false);
  const [present, setPresent] = useState([]);
  const [presentInRange, setPresentInRange] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tempUser, setTempUser] = useState(null);

  useEffect(() => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { username: user?.username },
      url: "https://shrouded-badlands-75056.herokuapp.com/employees/query",
    })
      .then((res) => setTempUser(res.data[0]))
      .catch((e) => alert(e.message));
  }, []);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const handleAttendance = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: { username: user?.username },
      url: "https://shrouded-badlands-75056.herokuapp.com/employees/query",
    })
      .then((res) => {
        const st = new Date(startDate);
        const ed = new Date(endDate);
        const d2 = new Date();
        const temp = res.data[0].presentOn?.filter((d) => {
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const d1 = new Date(date);
    const d2 = new Date();
    let repeat = false;
    tempUser?.presentOn.every((d) => {
      const t = new Date(d);
      if (
        t.getDate() == d2.getDate() &&
        t.getMonth() == d2.getMonth() &&
        t.getFullYear() == d2.getFullYear()
      ) {
        repeat = true;
        alert("already marked your attendance for today.");
        return false;
      }
      return true;
    });
    if (repeat) {
      return;
    }
    if (d1.getDay() == 0 || d1.getDay() == 6) {
      return alert("not a working day!!");
    }
    if (
      d1.getDate() == d2.getDate() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getFullYear() == d2.getFullYear()
    ) {
      Axios({
        method: "POST",
        withCredentials: true,
        params: { id: user?._id },
        data: { date: selectedDate },
        url:
          "https://shrouded-badlands-75056.herokuapp.com/employees/attendance",
      })
        .then((res) => {
          console.log(res);
          alert("successfully marked your attendance.");
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });
    } else {
      return alert("You can mark attendance only for today");
    }
  };
  return (
    <div className="attendance__container">
      <div className="attendance__container__input">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              fullWidth
              id="date-picker-dialog"
              label=" Mark your attendance "
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <Button
          onClick={() => setShowSearch(!showSearch)}
          variant="outlined"
          color="primary"
          className="attendance__container__input__button"
        >
          {showSearch === false
            ? "select date to view attendance record"
            : "hide"}
        </Button>
      </div>

      {showSearch && (
        <div className="daterange__container">
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
          <Button
            variant="outlined"
            color="primary"
            className="attendance__daterange__button"
            onClick={() => handleAttendance()}
          >
            view attendance
          </Button>
        </div>
      )}
      <div className="show__attendance">
        <p>No of days you were present on : {presentInRange?.length}</p>
        <div className="show__attendance__dates">
          {presentInRange?.map((d) => {
            const x = new Date(d);
            {
              /* alert(d); */
            }
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

{
  /* <div style={{ minHeight: "70vh", width: "70%", marginTop: "16px" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </div> */
}
