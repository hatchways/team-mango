import React from "react";
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
  ];

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
          <TableRow key={interview.id}>
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
              <Rating value={interview.codingRating} readOnly />
            </TableCell>
            <TableCell align="center">
              <Rating value={interview.communicationRating} readOnly />
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

  const upcomingOrOngoingInterviewList = [
    { id: "56ft45689hmy6ggbbnk" },
    { id: "905h456wl0lkhgrtynk" },
  ];

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
        {upcomingOrOngoingInterviewList.map((interview) => (
          <TableRow key={interview.id}>
            <TableCell component="th" scope="row">
              <Typography>{interview.id}</Typography>
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
