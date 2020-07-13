import React, { useState, useContext } from "react";

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
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAlert from "@material-ui/lab/Alert";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useTheme } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const backgroundStyle = (theme) => ({
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
  1: "JUNIOR",
  2: "ADVANCED JUNIOR",
  3: "INTERMEDIATE",
  4: "SENIOR",
  5: "ADVANCED SENIOR",
};
const details = {
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
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const userTmp = user;
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [language, setLanguage] = useState("React");
  const [experience, setExperience] = useState("");
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [message, setMessage] = useState("Please select your experience!");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  if (user === null) {
    return <p>Loading profile...</p>;
  } else if (user === "failed to fetch") {
    return <Redirect to="/login" />;
  } else if (user.backgroundCompleted) {
    props.history.push({ pathname: "/dashboard" });
  }

  const handleClick = () => {
    if (experience === "") {
      setOpenSnack(true);
    } else {
      userTmp.backgroundCompleted = true;
      userTmp.background.language = language;
      userTmp.background.experience = experience;
      userTmp.background.rating = value;
      console.log(userTmp.background);
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
            props.history.push({ pathname: "/dashboard" });
          } else {
            setMessage("Database connection problem!");
            setOpenSnack(true);
          }
          return responseJson;
        });
    }
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

  const ItemList = (selectID) => {
    return selectLists[selectID].map((item, i) => {
      return (
        <MenuItem key={i} value={item}>
          {item}
        </MenuItem>
      );
    });
  };
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={"true"}
        maxWidth={"md"}
        open={"true"}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent className={classes.dialog}>
          <Typography className={classes.title} align="center" variant="h3">
            Tell about your background
          </Typography>
          <Grid>
            <Typography className={classes.question}>Your language:</Typography>
            <FormControl variant="outlined" fullWidth>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={language}
                onChange={languageChange}
              >
                {" "}
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
              {value !== null && (
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
