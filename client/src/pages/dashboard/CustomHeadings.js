import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const tableHeadingStyles = makeStyles({
  style: {
    fontSize: "30px",
    color: "#516bf6",
    fontWeight: 400,
  },
});

export function TableHeading(props) {
  const classes = tableHeadingStyles();

  return <Typography className={classes.style}>{props.text}</Typography>;
}

const columnHeadingStyles = makeStyles({
  style: {
    fontSize: "16px",
    color: "#ffffff",
    fontWeight: 600,
  },
});

export function ColumnHeading(props) {
  const classes = columnHeadingStyles();

  return <Typography className={classes.style}>{props.text}</Typography>;
}
