import React, { useState, useContext } from "react";
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
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import pic1 from "../assets/pic1.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
  frame: {
    [theme.breakpoints.down("xs")]: {
      direction: "column",
    },
  },
  img: {
    margin: "auto",
    objectFit: "cover",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "300px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "300px",
      height: "100vh",
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
      height: "100vh",
    },
    [theme.breakpoints.up("lg")]: {
      width: "800px",
      height: "100vh",
    },
    [theme.breakpoints.up("xl")]: {
      width: "100px",
      height: "100vh",
    },
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
    minWidth: "6.3rem",
  },
  start: {
    paddingBottom: "1.5rem",
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

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [firstNameMessage, setFirstNameMessage] = useState(
    "First name requires at least 3 characters!"
  );
  const [lastNameMessage, setLastNameMessage] = useState(
    "Last name requires at least 3 characters!"
  );
  const [emailMessage, setEmailMessage] = useState("Invalid email!");
  const [passwordMessage, setPasswordMessage] = useState(
    "Password needs 6 characters or more!"
  );
  const [passwordConfirmedMessage, setPasswordConfirmedMessage] = useState(
    "Both passwords are needed to be the same!"
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("Invalid email or password!");
  const { user, setUser } = useContext(UserContext);

  const pathname = props.location.pathname;
  const onChangeFirstName = (e) => {
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
      pathname: props.location.pathname === "/signup" ? "/login" : "/signup",
      state: {},
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    pathname === "/signup" ? validation1() : validation2();
    setOpenSnack(true);
  };
  async function validation1() {
    await setFirstNameMessage(
      firstName.length < 3 ? "First name requires at least 3 characters!" : ""
    );

    await setLastNameMessage(
      lastName.length < 3 ? "Last name requires at least 3 characters!" : ""
    );
    await setEmailMessage(/^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid email!");

    await setPasswordMessage(
      password.length > 5 ? "" : "Password needs 6 characters or more!"
    );

    await setPasswordConfirmedMessage(
      password === passwordConfirmed
        ? ""
        : "Both passwords are needed to be the same!"
    );

    var success = false;
    if (
      firstName !== "" &&
      lastName !== "" &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length > 5 &&
      password === passwordConfirmed
    ) {
      success = true;
    } else {
      success = false;
    }
    await setSeverity(success ? "success" : "error");
    await setSuccessMessage(success ? "Sign up successfully!" : "");

    if (success === true) {
      //fetch here

      const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          confirmPassword: passwordConfirmed,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if ("email" in responseJson) {
            setUser(responseJson);
            props.history.push({
              pathname: "/background",
              state: {},
            });
          } else if ("error" in responseJson) {
            setEmailMessage(responseJson.error);
            setSuccessMessage("");
            setSeverity("error");
          } else if ("errors" in responseJson) {
            setEmailMessage(
              responseJson.errors[0].param + ": " + responseJson.errors[0].msg
            );
            setSuccessMessage("");
            setSeverity("error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async function validation2() {
    //fetch here
    const res = await fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if ("email" in responseJson) {
          setUser(responseJson);
          props.history.push({
            pathname: "/background",
            state: {},
          });
        } else if ("message" in responseJson) {
          setMessage(responseJson.message);
          setSeverity("error");
        } else if ("errors" in responseJson) {
          setMessage(
            responseJson.errors[0].param + ": " + responseJson.errors[0].msg
          );
          setSeverity("error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const { classes } = props;
  const question =
    pathname === "/signup"
      ? "Already have an account?"
      : "Don't have an account?";
  const buttonText = pathname === "/signup" ? "SIGN IN" : "SIGN UP";
  const textTitle = pathname === "/signup" ? "Get started!" : "Sign In";
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid className={classes.frame} container spacing={0}>
          <Grid item>
            <Grid>
              <img className={classes.img} alt="complex" src={pic1} />
            </Grid>
          </Grid>
          <Grid className={classes.text} item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
                <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                  <a className={classes.account}>{question}</a>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={signIn}
                  >
                    {buttonText}
                  </Button>
                </Box>
                <Typography className={classes.start} variant="h3">
                  {textTitle}
                </Typography>
                {pathname === "/signup" ? (
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
                      color="primary"
                    >
                      CONTINUE
                    </Button>
                    <Snackbar
                      open={openSnack}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity={severity}>
                        <div>{firstNameMessage}</div>
                        <div>{lastNameMessage}</div>
                        <div>{emailMessage}</div>
                        <div>{passwordMessage}</div>
                        <div>{passwordConfirmedMessage}</div>
                        <div>{successMessage}</div>
                      </Alert>
                    </Snackbar>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={12} md={12} lg={10} xl={9}>
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
                    <Typography>Forgot password?</Typography>
                    <Button
                      variant="contained"
                      className={classes.continue}
                      onClick={handleClick}
                      color="primary"
                    >
                      CONTINUE
                    </Button>
                    <Snackbar
                      open={openSnack}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity={severity}>
                        <div>{message}</div>
                      </Alert>
                    </Snackbar>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withStyles(signUpStyle)(SignUp);
