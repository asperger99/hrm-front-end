// import Axios from "axios";

export const updateValidate = (
  fullName,
  email,
  gender,
  dob,
  contact,
  salary,
  city,
  state,
  pincode,
  department,
  designation,
  isAdmin
) => {
  if (dob == null) {
    alert("dob field is required");
    return false;
  }
  if (contact == null) {
    alert("dob field is required");
    return false;
  }
  if (pincode == null) {
    alert("dob field is required");
    return false;
  }

  if (!fullName) {
    alert("Full Name field is required");
    return false;
  }
  if (!gender) {
    alert("gender field is required");
    return false;
  }
  if (!department) {
    alert("department field is required");
    return false;
  }
  if (!designation) {
    alert("designation field is required");
    return false;
  }
  if (!city) {
    alert("city field is required");
    return false;
  }
  if (!state) {
    alert("state field is required");
    return false;
  }
  if (!email) {
    alert("Email field is required");
    return false;
  }
  if (salary == null) {
    alert("salary field is required");
    return false;
  }

  if (isAdmin == null) {
    alert("Admin field is required");
    return false;
  }
  if (contact.toString().length != 10) {
    alert("contact number should be of 10 degits!!");
    return false;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email.");
    return false;
  }
  return true;
};
export const signInValidate = (username, password) => {
  if (!username || !password) {
    alert("each field is required");
    return false;
  }
  return true;
};

export const createEmployeeValidate = (
  fullName,
  username,
  isAdmin,
  gender,
  dob,
  email,
  contact,
  password,
  designation,
  department,
  salary,
  city,
  state,
  pincode
) => {
  if (!fullName) {
    alert("Full Name field is required");
    return false;
  }
  if (!username) {
    alert("username field is required");
    return false;
  }
  if (!gender) {
    alert("gender field is required");
    return false;
  }
  if (!department) {
    alert("department field is required");
    return false;
  }
  if (!designation) {
    alert("designation field is required");
    return false;
  }
  if (dob == null) {
    alert("dob field is required");
    return false;
  }
  if (contact == null) {
    alert("dob field is required");
    return false;
  }
  if (!password) {
    alert("password is required");
    return false;
  }
  if (pincode == null) {
    alert("dob field is required");
    return false;
  }
  if (!city) {
    alert("city field is required");
    return false;
  }
  if (!state) {
    alert("state field is required");
    return false;
  }
  if (!email) {
    alert("Email field is required");
    return false;
  }
  if (salary == null) {
    alert("salary field is required");
    return false;
  }

  if (isAdmin == null) {
    alert("Admin field is required");
    return false;
  }
  if (contact.toString().length != 10) {
    alert("contact number should be of 10 degits!!");
    return false;
  }

  if (!email.includes("@")) {
    alert("Enter a valid email.");
    return false;
  }
  let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  let str = "" + password;
  if (!str.match(decimal)) {
    alert(
      "password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    );
    return false;
  }
  return true;
};

export const signUpValidate = (
  fullName,
  username,
  password,
  dob,
  gender,
  email,
  designation,
  department,
  city,
  state,
  pincode,
  contact
) => {
  if (!email) {
    alert(email);
    alert("Email field is required");
    return false;
  }
  if (!username) {
    alert("username field is required");
    return false;
  }
  if (!fullName) {
    alert("Full Name field is required");
    return false;
  }

  if (dob == null) {
    alert("dob field is required");
    return false;
  }
  if (contact == null) {
    alert("contact field is required");
    return false;
  }

  if (!gender) {
    alert("gender field is required");
    return false;
  }

  if (!password) {
    alert("password is required");
    return false;
  }
  if (!department) {
    alert("department field is required");
    return false;
  }
  if (!designation) {
    alert("designation field is required");
    return false;
  }
  if (!city) {
    alert("city field is required");
    return false;
  }
  if (!state) {
    alert("state field is required");
    return false;
  }
  if (!pincode == null) {
    alert("pincode field is required");
    return false;
  }

  if (contact.toString().length != 10) {
    alert("contact number should be of 10 degits!!");
    return false;
  }

  //   let mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

  if (!email.includes("@")) {
    alert("Enter a valid email.");
    return false;
  }
  let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  let str = "" + password;
  if (!str.match(decimal)) {
    alert(
      "password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    );
    return false;
  }

  return true;
};
