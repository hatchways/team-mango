import React, { Component } from "react";
import axios from "axios";

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
//src={pic1}
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
    //    width: '100',
    height: "100vh",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  text: {
    paddingTop: "0.5rem",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  account: {
    paddingTop: "0.5rem",
  },
  button: {
    borderRadius: 35,
    marginLeft: "1rem",
    marginRight: "0rem",
    marginBottom: "2rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    minWidth: "6rem",
  },
  start: {
    paddingBottom: "1.5rem",
  },
  input: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  continue: {
    backgroundColor: "#0000ff",
//    color: "#ffffff",
    borderRadius: 35,
    marginTop: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmed: "",
      openSnack: false,
      severity: "error",
      firstNameMessage: "First name is required!",
      lastNameMessage: "Last name is required!",
      emailMessage: "Invalid email!",
      passwordMessage: "Password needs 6 characters or more!",
      passwordConfirmedMessage: "Both passwords are needed to be the same!",
      successMessage: "",
    };
  }

  componentDidMount() {
    fetch("/welcome")
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.json();
        else throw Error("Couldn't connect to the server");
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.message);
      });
  }

  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  };
  onChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangePasswordConfirmed = (e) => {
    this.setState({ passwordConfirmed: e.target.value });
  };
  signIn = () => {
    this.props.history.push({
      pathname: "/login",
      state: {},
    });
  };
  handleClick = (e) => {
    e.preventDefault();
    this.validation();
    this.setState({ openSnack: true });
  };
  async validation() {
    await this.setState({
      firstNameMessage:
        this.state.firstName === "" ? "First name is required!" : "",
    });
    await this.setState({
      lastNameMessage:
        this.state.lastName === "" ? "Last name is required!" : "",
    });
    await this.setState({
      emailMessage: /^\S+@\S+\.\S+$/.test(this.state.email)
        ? ""
        : "Invalid email!",
    });
    await this.setState({
      passwordMessage:
        this.state.password.length > 5
          ? ""
          : "Password needs 6 characters or more!",
    });
    await this.setState({
      passwordConfirmedMessage:
        this.state.password === this.state.passwordConfirmed
          ? ""
          : "Both passwords are needed to be the same!",
    });
    var success = false;
    if (
      this.state.firstNameMessage === "" &&
      this.state.lastNameMessage === "" &&
      this.state.emailMessage === "" &&
      this.state.passwordMessage === "" &&
      this.state.passwordConfirmedMessage === ""
    ) {
      success = true;
    }
    await this.setState({
      severity: success ? "success" : "error",
      successMessage: success ? "Sign up successfully!" : "",
    });
    if (success === true) {
      //fetch here

      const res = fetch("http://localhost:3001/signup", {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json"},
        body: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.passwordConfirmed
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.errors;
        })
        .catch((error) => {
          console.error(error);
        });

/*
      axios
        .post("http://localhost:3001/signup", {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.passwordConfirmed
        })
        .then((response) => {
          this.setState(
            {
              //      successMessage: response.data.msg
              successMessage: response.status,
            },
            () => {}
          )
          .catch(function (error) {
            console.log(error);
          });
        });
        */
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;
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
                      onClick={this.signIn}
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
                      value={this.state.firstName}
                      onChange={this.onChangeFirstName}
                    />
                    <Typography>Last name</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="Last name"
                      type="last name"
                      variant="outlined"
                      value={this.state.lastName}
                      onChange={this.onChangeLastName}
                    />
                    <Typography>Email address</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="john@mail.com"
                      type="email"
                      variant="outlined"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                    <Typography>Password</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="Password"
                      type="password"
                      variant="outlined"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                    <Typography>Confirm password</Typography>
                    <TextField
                      className={classes.input}
                      fullWidth
                      placeholder="Confirm password"
                      type="password"
                      variant="outlined"
                      value={this.state.passwordConfirmed}
                      onChange={this.onChangePasswordConfirmed}
                    />
                    <Button
                      variant="contained"
                      className={classes.continue}
                      onClick={this.handleClick}
                      color = "primary"
                    >
                      CONTINUE
                    </Button>
                    <Snackbar
                      open={this.state.openSnack}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert
                        onClose={this.handleClose}
                        severity={this.state.severity}
                      >
                        <div>{this.state.firstNameMessage}</div>
                        <div>{this.state.lastNameMessage}</div>
                        <div>{this.state.emailMessage}</div>
                        <div>{this.state.passwordMessage}</div>
                        <div>{this.state.passwordConfirmedMessage}</div>
                        <div>{this.state.successMessage}</div>
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
}

export default withStyles(signUpStyle)(SignUp);
