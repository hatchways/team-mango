import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const insideTableButtonStyles = makeStyles({
  button: {
    width: "80px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #d4d9e2",
  },
  text: {
    fontSize: "13px",
    color: "#5e6676",
    fontWeight: 600,
  },
});

export function InsideTableButton(props) {
  const classes = insideTableButtonStyles();

  return (
    <Button variant="outlined" className={classes.button}>
      <Typography className={classes.text}>{props.text}</Typography>
    </Button>
  );
}

const startButtonStyles = makeStyles({
  button: {
    width: "80px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "#516bf6",
  },
  text: {
    fontSize: "13px",
    color: "white",
    fontWeight: 600,
  },
});

export function StartButton(props) {
  const classes = startButtonStyles();
  const { marginRight } = props;

  return (
    <Button
      variant="contained"
      disableElevation
      className={classes.button}
      style={{ "margin-right": `${marginRight}` }}
    >
      <Typography className={classes.text}>{props.text}</Typography>
    </Button>
  );
}

const joinButtonStyles = makeStyles({
  button: {
    width: "80px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "white",
    border: "1px solid #516bf6",
  },
  text: {
    fontSize: "13px",
    color: "#516bf6",
    fontWeight: 600,
  },
});

export function JoinButton(props) {
  const classes = joinButtonStyles();

  return (
    <Button variant="outlined" className={classes.button}>
      <Typography className={classes.text}>{props.text}</Typography>
    </Button>
  );
}
