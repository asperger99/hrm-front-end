import React, { useState, useEffect } from "react";
import "./Payrolls.css";
import Axios from "axios";
import { UseStateValue } from "../../StateProvider";

import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "username", headerName: "username", width: 150 },
  {
    field: "lastPaidMonth",
    headerName: "Last Paid Month",
    width: 180,
  },
  {
    field: "yearOfMonth",
    headerName: "Year of payment",
    width: 180,
  },
  {
    field: "salaryDue",
    headerName: "salary due",
    type: "number",
    width: 180,
  },
];
// let temp = [];

function Payrolls() {
  const [{ rows }, dispatch] = UseStateValue();
  // const [rows, setRows] = useState([]);

  const payrollData = () => {
    console.log("payroll");
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://shrouded-badlands-75056.herokuapp.com/payroll/load",
    })
      .then((res) => {
        // console.log(res);
        let temp = [];

        res?.data?.forEach((element, index) => {
          temp.push({
            id: index + 1,
            username: element.username,
            lastPaidMonth: element.lastPaidMonth,
            yearOfMonth: element.yearOfMonth,
            salaryDue: element.salaryDue,
          });
        });
        dispatch({
          type: "UPDATE_PAYROLL",
          item: temp,
        });
      })
      .catch((e) => alert(e.message));
  };
  // payrollData();

  useEffect(() => {
    payrollData();
  }, []);

  return (
    <>
      <div style={{ minHeight: "70vh", width: "90%", marginTop: "16px" }}>
        <DataGrid rows={rows} columns={columns} pageSize={8} />
      </div>
    </>
  );
}

export default Payrolls;
