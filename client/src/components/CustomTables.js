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
import { Button } from "@material-ui/core";
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

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var time = hours + ":" + minutes + " " + amPm;
  return time;
}

function formatDate(unformattedDate) {
  //Thursday , April 30, 2020
  const year = unformattedDate.getFullYear();
  const date = unformattedDate.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = unformattedDate.getMonth();
  const monthName = months[monthIndex];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = unformattedDate.getDay();
  const dayName = days[dayIndex];
  //Thursday , April 30, 2020
  return dayName + " , " + monthName + " " + date + ", " + year;
}

export function PastPracticeTable(props) {
  const classes = pastPracticeTableStyles();
  const [completedInterviewsList, setCompletedInterviewsList] = useState([]);

  useEffect(() => {
    fetch("interviews/completed")
      .then((result) => result.json())
      .then((data) => {
        data.forEach((element) => {
          let startDate = new Date(element.startTime);
          let endDate = new Date(element.endTime);
          element.heldOnDate = formatDate(startDate);
          element.heldOnTime =
            formatAMPM(startDate) + " - " + formatAMPM(endDate);
          setCompletedInterviewsList((prevArray) => [...prevArray, element]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

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
        {completedInterviewsList.map((interview) => (
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
  const [newongoingInterviewList, setnewongoingInterviewList] = useState([]);
  function cancelInterview(id) {
    fetch("interviews/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    })
      .then(() => {
        let arr = ongoingInterviewList;
        let index = arr.indexOf(id);
        if (index !== -1) {
          arr.splice(index, 1);
          setOngoingInterviewList([...arr]);
        }
      })
      .catch((err) => console.log(err));
  }

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
              <Button
                variant="outlined"
                onClick={() => cancelInterview(interviewId)}
              >
                {" "}
                Cancel{" "}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
