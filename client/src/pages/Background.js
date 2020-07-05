import React, { useState } from "react";

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

const backgroundStyle = (theme) => ({
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
    padding: ".5rem 20% .5rem 20%", 
  },
  account: {
    paddingTop: "0.5rem",
  },
  title: {
    color: "#0000ff",
    fontFamily: "Open Sans",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
  nextStep: {
    borderRadius: 35,
    margin: "3rem 0rem 0rem 0rem",
    padding: ".5rem 1.5rem .5rem 1.5rem",
  },
  question: {
    margin: "2rem 0 .5rem 0",
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

function Background(props){

  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [language, setLanguage] = useState('React');
  const [experience, setExperience] = useState('');
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
 
  const handleClick = () => {
    setOpenSnack((experience === "" ) ? true : false );
  }; 
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const languageChange = (e) => {
    setLanguage(e.target.value);
  };
  const experienceChange = (e) => {
    setExperience(e.target.value);
  };

    const { classes } = props;
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
                        value={language}
                        onChange={languageChange}
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
                        value={experience}
                        onChange={experienceChange}
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
                        value={value}
                        precision={1}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {value !== null
                        &&
                        <div>
                        <Box ml={0} style={{color: "#0000ff"}}>
                        {labels[hover !== -1 ? hover : value]}
                        </Box>
                        <Box ml={0} style={{color: "#888888"}}>
                        {details[hover !== -1 ? hover : value]}
                        </Box>
                        </div>
                      }
                    </div>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Button
                      variant="contained"
                      className={classes.nextStep}
                      onClick={handleClick}
                      color = "primary"
                    >
                      NEXT STEP
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


export default withStyles(backgroundStyle)(Background);
