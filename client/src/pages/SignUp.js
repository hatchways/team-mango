import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const width = window.innerWidth;
const signUpStyle = (theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(0),
    margin: "auto",
    width: "Full",
    height: "100%",
    border: 0,
  },
  image: {
    height: "100vh",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  text: {
    padding: ".5rem 5% .5rem 5%",
  },
  account: {
    paddingTop: "0.5rem",
  },
  button: {
    borderRadius: 35,
    margin: "0rem 0rem 2rem 1rem",
    padding: ".5rem 1.5rem .5rem 1.5rem",
    minWidth: "6rem",
  },
  start: {
    paddingBottom: "1.5rem",
    fontFamily: "Open Sans",
  },
  input: {
    margin: ".5rem 0rem 1rem 0rem",
  },
  continue: {
    borderRadius: 35,
    margin: "1rem 0rem 0rem 0rem",
    padding: ".5rem 1.5rem .5rem 1.5rem",
  },
});

function SignUp(props){
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [passwordConfirmed, setPasswordConfirmed] = useState('');
      const [openSnack, setOpenSnack] = useState(false);
      const [severity, setSeverity] = useState('error');
      const [firstNameMessage, setFirstNameMessage] = useState('First name is required!');
      const [lastNameMessage, setLastNameMessage] = useState('Last name is required!');
      const [emailMessage, setEmailMessage] = useState('Invalid email!');
      const [passwordMessage, setPasswordMessage] = useState('Password needs 6 characters or more!');
      const [passwordConfirmedMessage, setPasswordConfirmedMessage] = useState('Both passwords are needed to be the same!');
      const [successMessage, setSuccessMessage] = useState('');
    
  
  const onChangeFirstName = e => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirmed = (e) => {
    setPasswordConfirmed(e.target.value);
  };
  const signIn = () => {
    props.history.push({
      pathname: "/login",
      state: {},
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    validation();
    setOpenSnack(true);
  };
  async function validation() {
    await setFirstNameMessage((firstName === "") ? "First name is required!" : "");
    
    await setLastNameMessage((lastName === "") ? "Last name is required!" : "");
    
    await setEmailMessage((/^\S+@\S+\.\S+$/.test(email)) ? "" : "Invalid email!");
    
    await setPasswordMessage((password.length > 5) ? "" : "Password needs 6 characters or more!");
    
    await setPasswordConfirmedMessage((password === passwordConfirmed) ? "" : "Both passwords are needed to be the same!");
    
    var success = false;
    if (
      firstName !== "" &&
      lastName !== "" &&
      (/^\S+@\S+\.\S+$/.test(email)) &&
      (password.length > 5) &&
      (password === passwordConfirmed)
    ) {
      success = true;
    }
    else {
      success = false;
    }
    await setSeverity((success) ? "success" : "error");
    await setSuccessMessage((success) ? "Sign up successfully!" : "");
    
    if (success === true) {
      //fetch here

      const res = fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          confirmPassword: passwordConfirmed
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.errors;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

    const { classes } = props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Grid class="frame" container spacing={0}>
            <Grid item>
              <Grid class="image">
                <img className={classes.img} alt="complex" src={(width < 680) ? pic2 : (width > 1100) ? pic1 : pic3}/>
              </Grid>
            </Grid>
            <Grid className={classes.text} item xs={12} sm container>
              <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                  <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                    <a className={classes.account}>Already have an account?</a>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={signIn}
                    >
                      SIGN IN
                    </Button>
                  </Box>
                  <Typography className={classes.start} variant="h3">
                    Get started!
                  </Typography>
                  <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
                    <Typography>First name</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="First name"
                      type="first name"
                      variant="outlined"
                      value={firstName}
                      onChange={onChangeFirstName}
                    />
                    <Typography>Last name</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="Last name"
                      type="last name"
                      variant="outlined"
                      value={lastName}
                      onChange={onChangeLastName}
                    />
                    <Typography>Email address</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="john@mail.com"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={onChangeEmail}
                    />
                    <Typography>Password</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="Password"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={onChangePassword}
                    />
                    <Typography>Confirm password</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="Confirm password"
                      type="password"
                      variant="outlined"
                      value={passwordConfirmed}
                      onChange={onChangePasswordConfirmed}
                    />
                    <Button
                      variant="contained"
                      className={classes.continue}
                      onClick={handleClick}
                      color = "primary"
                    >
                      CONTINUE
                    </Button>
                    <Snackbar
                      open={openSnack}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert
                        onClose={handleClose}
                        severity={severity}
                      >
                        <div>{firstNameMessage}</div>
                        <div>{lastNameMessage}</div>
                        <div>{emailMessage}</div>
                        <div>{passwordMessage}</div>
                        <div>{passwordConfirmedMessage}</div>
                        <div>{successMessage}</div>
                      </Alert>
                    </Snackbar>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }


export default withStyles(signUpStyle)(SignUp);
