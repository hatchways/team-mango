import React, { Component } from "react";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const loginStyle = (theme) => ({
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
    paddingLeft: "6rem",
  },
  account: {
    paddingTop: "0.5rem",
  },
  button: {
    borderRadius: 35,
    marginLeft: "1rem",
    marginRight: "1.5rem",
    marginBottom: "2rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
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
    color: "#ffffff",
    borderRadius: 35,
    marginTop: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      openSnack: false,
      severity: "error",
      message: "Invalid email or password!",
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

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  signUp = () => {
    this.props.history.push({
      pathname: "/signup",
      state: {},
    });
  };
  handleClick = () => {
    this.validation();
    this.setState({ openSnack: true });
  };
  async validation() {
    //fetch here
    const res = fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.cookie;
      })
      .catch((error) => {
        console.error(error);
      });

    var success = false;
    if (true) {
      success = true;
    }
    await this.setState({
      severity: success ? "success" : "error",
      message: success ? "Sign in successfully!" : "Invalid email or password!",
    });
    if (success === true) {
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
          <Grid container spacing={0}>
            <Grid item>
              <Grid className={classes.image}>
                <img className={classes.img} alt="complex" src={pic1} />
              </Grid>
            </Grid>
            <Grid className={classes.text} item xs={12} sm container>
              <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                  <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                    <a className={classes.account}>Don't have an account?</a>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={this.signUp}
                    >
                      SIGN UP
                    </Button>
                  </Box>
                  <Typography className={classes.start} variant="h3">
                    Sign In
                  </Typography>
                  <Grid item xs={11} sm={9} md={7} lg={4} xl={3}>
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
                    <Typography>Forgot password?</Typography>
                    <Button
                      variant="contained"
                      className={classes.continue}
                      onClick={this.handleClick}
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
                        <div>{this.state.message}</div>
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

export default withStyles(loginStyle)(Login);
