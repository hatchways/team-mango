import React, { useState, useContext } from "react"; //useState: one of Hooks in React to store states

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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiAlert from "@material-ui/lab/Alert";
import Rating from "@material-ui/lab/Rating"; //Some components from Material-UI/lab
import { withStyles } from "@material-ui/core/styles"; //Hook from Material-UI for styles
import { Route, Link, Redirect } from "react-router-dom"; //components for routing to other pages
import { UserContext } from "../contexts/UserContext";
import { useTheme } from '@material-ui/core/styles';

function Alert(props) {
  //MuiAlert is a standard original component from Material-UI. Alert is a styled one with following properties
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const backgroundStyle = (theme) => ({
  //styling for this page. It will be used with withStyles at the end of the file
  root: {
    backgroundColor: "#495074",
    height: "100vh",
  },
  dialog: {
    [theme.breakpoints.up("sm")]: {
      padding: ".5rem 16% .5rem 16%",
    },
  },
  title: {
    color: "#4545F5",
    marginTop: "3rem",
    paddingBottom: "1rem",
//    width: "863px",
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
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const userTmp = user;
  const [openSnack, setOpenSnack] = useState(false); //openSnack is one of the states. setOpenSnack is its method to change it. False is default value.
  const [severity, setSeverity] = useState("error");
  const [language, setLanguage] = useState("React");
  const [experience, setExperience] = useState("");
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [message, setMessage] = useState("Please select your experience!");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  if (user === null) {
    return <p>Loading profile...</p>;
  } else if (user.backgroundCompleted) {
    props.history.push({pathname: "/dashboard"});
  }

  const handleClick = () => {
    //the method to handle "next step" button being clicked
    if (experience === "") {
      setOpenSnack(true);
    } else {
      userTmp.backgroundCompleted = true;
      userTmp.background.language = language;
      userTmp.background.experience = experience;
      userTmp.background.rating = value;
      console.log(userTmp.background);
      //fetch here
      const res = fetch("/" + user.id, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userTmp),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.msg === "updated") {
            setUser(userTmp);
            props.history.push({pathname: "/dashboard"});
          } else {
            setMessage("Database connection problem!");
            setOpenSnack(true);
          }
          return responseJson;
        })
        /*
        .catch((error) => {
          console.error(error);
          setMessage("Database connection problem!");
          setOpenSnack(true);
        });*/
    }
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
    <Dialog
      fullScreen={fullScreen}
      fullWidth={'true'}
      maxWidth={'md'}
      open={'true'}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent className={classes.dialog}>
      <Typography
        className={classes.title}
        align="center"
        variant="h3"
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
              <div>{message}</div>
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
      </DialogContent>

    </Dialog>
    </div>
  );
}

export default withStyles(backgroundStyle)(Background);
