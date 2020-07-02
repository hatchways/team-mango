import React, { Component } from "react";

import {
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  TextField,
  Snackbar,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Rating from '@material-ui/lab/Rating';
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
    //    width: '90vh',
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
    paddingLeft: "20%",
    paddingRight: "20%",
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
  title: {
    color: "#0000ff",
    fontFamily: "Arial",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
  input: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  nextStep: {
    backgroundColor: "#0000ff",
    color: "#ffffff",
    borderRadius: 35,
    marginTop: "3rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
  question: {
    marginTop: "2rem",
    marginBottom: "0.5rem",
  }
});
const labels = {
  1: "JUNIOR",
  2: "ADVANCED JUNIOR",
  3: "INTERMEDIATE",
  4: "SENIOR",
  5: "ADVANCED SENIOR",
}
const details = {
  1: "Do not have any experience on interviews",
  2: "Had one or two interviews before",
  3: "Had a few job interviews, but need more practice",
  4: "Had seven to twelve interviews before, and want to know more about interview skills",
  5: "Had more than twelve interviews before, and know much about interview skills",
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      openSnack: false,
      severity: "error",
      message: "Invalid email or password!",
      language: "React",
      experience: "",
      value: 2,
      hover: -1,
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
//    this.validation();
    this.setState({ openSnack: (this.state.experience === "" ) ? true : false });
  };
  async validation() {
    //fetch here
    const res = fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: {
        email: this.state.email,
        password: this.state.password,
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
  languageChange = (e) => {
    this.setState({language: e.target.value});
  };
  experienceChange = (e) => {
    this.setState({experience: e.target.value});
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={0}>
            <Grid item>
              <Grid className={classes.image}></Grid>
            </Grid>
            <Grid className={classes.text} item xs={12} sm container>
              <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h2"
                  >
                    Tell about your background
                  </Typography>
                  <Grid>
                    <Typography className={classes.question}>Your language:</Typography>
                    <FormControl
                      variant="outlined"
                      fullWidth
                    >
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.language}
                        onChange={this.selectChange}
                      >
                        <MenuItem value={"React"}>React</MenuItem>
                        <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
                        <MenuItem value={"Node.js"}>Node.js</MenuItem>
                        <MenuItem value={"Angular"}>Angular</MenuItem>
                        <MenuItem value={"Python"}>Python</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography className={classes.question}>Years of professional experience:</Typography>
                    <FormControl
                      variant="outlined"
                      fullWidth
                    >
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        displayEmpty
                        value={this.state.experience}
                        onChange={this.experienceChange}
                      >
                        <MenuItem disabled value="">
                          Select your experience
                        </MenuItem>
                        <MenuItem value={"<1"}>Less than 1 year</MenuItem>
                        <MenuItem value={"1-3"}>1 to 3 years</MenuItem>
                        <MenuItem value={"4-6"}>4 to 6 years</MenuItem>
                        <MenuItem value={"7-10"}>7 to 10 years</MenuItem>
                        <MenuItem value={">10"}>More than 10 years</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography className={classes.question}>What is your level at job interviews?</Typography>
                    <div>
                      <Rating
                        name="hover-feedback"
                        value={this.state.value}
                        precision={1}
                        onChange={(event, newValue) => {
                          this.setState({value: newValue});
                        }}
                        onChangeActive={(event, newHover) => {
                          this.setState({hover: newHover});
                        }}
                      />
                      {this.state.value !== null
                        &&
                        <div>
                        <Box ml={0} style={{color: "#0000ff"}}>
                        {labels[this.state.hover !== -1 ? this.state.hover : this.state.value]}
                        </Box>
                        <Box ml={0} style={{color: "#888888"}}>
                        {details[this.state.hover !== -1 ? this.state.hover : this.state.value]}
                        </Box>
                        </div>
                      }
                    </div>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Button
                      variant="contained"
                      className={classes.nextStep}
                      onClick={this.handleClick}
                    >
                      NEXT STEP
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
                        <div>Please select your experience!</div>
                      </Alert>
                    </Snackbar>
                    </Box>
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
