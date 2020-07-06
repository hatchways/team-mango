import React, { useState } from "react"; //useState: one of Hooks in React to store states

import {
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Snackbar,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core"; //Styled components from Material-UI/core
import MuiAlert from "@material-ui/lab/Alert";
import Rating from "@material-ui/lab/Rating"; //Some components from Material-UI/lab
import { withStyles } from "@material-ui/core/styles"; //Hook from Material-UI for styles
import { Route, Link } from "react-router-dom"; //components for routing to other pages

function Alert(props) {
  //MuiAlert is a standard original component from Material-UI. Alert is a styled one with following properties
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const backgroundStyle = (theme) => ({
  //styling for this page. It will be used with withStyles at the end of the file
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
  },
});
const labels = {
  //array for Rating component
  1: "JUNIOR",
  2: "ADVANCED JUNIOR",
  3: "INTERMEDIATE",
  4: "SENIOR",
  5: "ADVANCED SENIOR",
};
const details = {
  //array for Rating component
  1: "Do not have any experience on interviews",
  2: "Had one or two interviews before",
  3: "Had a few job interviews, but need more practice",
  4: "Had seven to twelve interviews before, and want to know more about interview skills",
  5: "Had more than twelve interviews before, and know much about interview skills",
};
const selectLists = [
  ["React", "JavaScript", "Node.js", "Angular", "Python"],
  [
    "Less than 1 year",
    "1 to 3 years",
    "4 to 6 years",
    "7 to 10 years",
    "More than 10 years",
  ],
];

function Background(props) {
  //the function component for the background page is declared here

  const [openSnack, setOpenSnack] = useState(false); //openSnack is one of the states. setOpenSnack is its method to change it. False is default value.
  const [severity, setSeverity] = useState("error");
  const [language, setLanguage] = useState("React");
  const [experience, setExperience] = useState("");
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const handleClick = () => {
    //the method to handle "next step" button being clicked
    setOpenSnack(experience === "" ? true : false);
  };
  const handleClose = (event, reason) => {
    //the method to handle Snack "x" button being clicked
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const languageChange = (e) => {
    //change the value(state) of language when it is selected
    setLanguage(e.target.value);
  };
  const experienceChange = (e) => {
    //change the value(state) of experience when it is selected
    setExperience(e.target.value);
  };

  const ItemList = (selectID) => {
    return selectLists[selectID].map((item, i) => {
      return (
        <MenuItem key={i} value={item}>
          {item}
        </MenuItem>
      );
    });
  };
  const { classes } = props; //classes property for styling is passed at the last line of this file
  return (
    <div className={classes.root}>
      {" "}
      {/*use classNmae instead of class in React. div is a HTML tag */}
      <Paper className={classes.paper} elevation={0}>
        {" "}
        {/*Paper and Grid are Material-UI components*/}
        <Grid container spacing={0}>
          <Grid item>
            <Grid className={classes.image}></Grid>{" "}
            {/*root, paper, image, ... are styled above*/}
          </Grid>{" "}
          {/*Grid is usually used for the format of the layout*/}
          <Grid className={classes.text} item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h2"
                >
                  {/*styled component for text*/}
                  Tell about your background
                </Typography>
                <Grid>
                  <Typography className={classes.question}>
                    Your language:
                  </Typography>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={language}
                      onChange={languageChange}
                    >
                      {" "}
                      {/*Select component with five options. I will use "map" and array instead of following five lines*/}
                      {ItemList(0)}
                    </Select>
                  </FormControl>
                  <Typography className={classes.question}>
                    Years of professional experience:
                  </Typography>
                  <FormControl variant="outlined" fullWidth>
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
                      {ItemList(1)}
                    </Select>
                  </FormControl>
                  <Typography className={classes.question}>
                    What is your level at job interviews?
                  </Typography>
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
                    {value !== null && ( //conditional render: only display this div when value !== null
                      <div>
                        <Box ml={0} style={{ color: "#0000ff" }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                        <Box ml={0} style={{ color: "#888888" }}>
                          {details[hover !== -1 ? hover : value]}
                        </Box>
                      </div>
                    )}
                  </div>
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Button
                      variant="contained"
                      className={classes.nextStep}
                      onClick={handleClick}
                      color="primary"
                    >
                      {" "}
                      {/*use {} for state and method instead of ""*/}
                      NEXT STEP
                    </Button>
                    <Snackbar
                      open={openSnack}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <Alert onClose={handleClose} severity={severity}>
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
