import React, { useState } from "react";

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
    padding: ".5rem 5% .5rem 5%",
  },
  account: {
    paddingTop: "0.5rem",
  },
  button: {
    borderRadius: 35,
    margin: "0rem 0rem 2rem 1rem",
    padding: ".5rem 1.5rem .5rem 1.5rem",
    minWidth: "6.2rem",
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

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('Invalid email or password!');
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const signUp = () => {
    props.history.push({
      pathname: "/signup",
      state: {},
    });
  };
  const handleClick = () => {
    validation();
    setOpenSnack(true);
  };
  async function validation() {
    //fetch here
    const res = fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: {
        email: email,
        password: password,
      },
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
    await setSeverity((success) ? "success" : "error");
    await setMessage((success) ? "Sign in successfully!" : "Invalid email or password!");
    
    if (success === true) {
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
                    <a className={classes.account}>Don't have an account?</a>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={signUp}
                    >
                      SIGN UP
                    </Button>
                  </Box>
                  <Typography className={classes.start} variant="h3">
                    Sign In
                  </Typography>
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
                        <div>{message}</div>
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


export default withStyles(loginStyle)(Login);
