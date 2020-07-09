import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { ColumnHeading } from "./CustomHeadings";
import { InsideTableButton } from "./CustomButtons";

const pastPracticeTableStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tableHead: {
    backgroundColor: "#516bf6",
  },
});

export function PastPracticeTable(props) {
  const classes = pastPracticeTableStyles();
  const [completedInterviewsList, setCompletedInterviewsList] = useState([]);

  useEffect(() => {
    fetch("interviews/completed")
      .then((result) => result.json())
      .then((data) => {
        data.forEach((element) => {
          setCompletedInterviewsList((prevArray) => [...prevArray, element]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const pastInterviewList = [
    {
      id: 1,
      heldOnDate: "Thursday, April 30, 2020",
      heldOnTime: "10:00 AM - 11:00 AM",
      codingRating: 5,
      communicationRating: 4,
    },
    {
      id: 2,
      heldOnDate: "Wednesday, March 18, 2020",
      heldOnTime: "2:00 PM - 3:30 PM",
      codingRating: 3,
      communicationRating: 5,
    },
    {
      id: 3,
      heldOnDate: "MOnday, March 16, 2020",
      heldOnTime: "12:00 PM - 1:30 PM",
    },
  ];

  function RatingComponent(props) {
    const isRatingProvided = props.isRatingProvided;
    const value = props.value;

    if (isRatingProvided) {
      return <Rating value={value} readOnly />;
    } else {
      return <Typography>N/A</Typography>;
    }
  }

  return (
    <Table className={classes.root} aria-label="Past practice interviews table">
      <TableHead className={classes.tableHead}>
        <TableCell>
          <ColumnHeading text="Held on" />
        </TableCell>
        <TableCell align="center">
          <ColumnHeading text="Coding" />
        </TableCell>
        <TableCell align="center">
          <ColumnHeading text="Communication" />
        </TableCell>
        <TableCell align="center">
          <ColumnHeading text="Questions" />
        </TableCell>
        <TableCell align="center">
          <ColumnHeading text="Detailed Feedback" />
        </TableCell>
      </TableHead>
      <TableBody>
        {pastInterviewList.map((interview) => (
          <TableRow key={interview._id}>
            <TableCell component="th" scope="row">
              <Grid container direction="column">
                <Grid item>
                  <Typography>{interview.heldOnDate}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{interview.heldOnTime}</Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell align="center">
              <RatingComponent
                value={interview.codingRating}
                isRatingProvided={
                  interview.codingRating && interview.codingRating >= 0
                }
              />
            </TableCell>
            <TableCell align="center">
              <RatingComponent
                value={interview.communicationRating}
                isRatingProvided={
                  interview.communicationRating &&
                  interview.communicationRating >= 0
                }
              />
            </TableCell>
            <TableCell align="center">
              <InsideTableButton text="view" />
            </TableCell>
            <TableCell align="center">
              <InsideTableButton text="view" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const upcomingOrOngoingTableStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tableHead: {
    backgroundColor: "#516bf6",
  },
});

export function UpcomingOrOngoingTable(props) {
  const classes = upcomingOrOngoingTableStyles();
  const [ongoingInterviewList, setOngoingInterviewList] = useState([]);

  useEffect(() => {
    fetch("interviews/ongoing")
      .then((result) => result.json())
      .then((data) => {
        data.forEach((element) => {
          setOngoingInterviewList((prevArray) => [...prevArray, element]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Table
      className={classes.root}
      aria-label="Upcoming or Ongoing interviews table"
    >
      <TableHead className={classes.tableHead} align="center">
        <TableCell>
          <ColumnHeading text="Interview ID" />
        </TableCell>
        <TableCell align="center">
          <ColumnHeading text="Action" />
        </TableCell>
      </TableHead>
      <TableBody>
        {ongoingInterviewList.map((interviewId) => (
          <TableRow key={interviewId}>
            <TableCell component="th" scope="row">
              <Typography>{interviewId}</Typography>
            </TableCell>
            <TableCell align="center">
              <InsideTableButton text="Cancel" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
