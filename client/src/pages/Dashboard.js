import React from "react";
import { Grid, TableContainer, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StartButton, JoinButton } from "../components/CustomButtons";
import { TableHeading } from "../components/CustomHeadings";
import { PastPracticeTable, UpcomingOrOngoingTable } from "../components/CustomTables";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainChildContainer: {
    paddingTop: "4rem",
  },
  pastPracticeInterviewContainer: {
    marginTop: "2rem",
  },
  tableContainer: {
    padding: 0,
    marginTop: "2rem",
  },
  table: {
    minWidth: 650,
  },
}));

function Dashboard(props) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={0} sm={2} />
      <Grid
        item
        xs={12}
        sm={8}
        container
        className={classes.mainChildContainer}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <StartButton text="Start" marginRight="1rem" />
          <JoinButton text="Join" />
        </Grid>
        <Grid
          item
          container
          className={classes.pastPracticeInterviewContainer}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TableHeading text="Upcoming or Ongoing interviews" />
          <TableContainer className={classes.tableContainer} component={Paper}>
            <UpcomingOrOngoingTable className={classes.table} />
          </TableContainer>
        </Grid>
        <Grid
          item
          container
          className={classes.pastPracticeInterviewContainer}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TableHeading text="Past practice interviews" />
          <TableContainer className={classes.tableContainer} component={Paper}>
            <PastPracticeTable className={classes.table} />
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  );
}

export default Dashboard;
