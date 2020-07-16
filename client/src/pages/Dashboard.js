import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";
import { Grid, TableContainer, Paper } from "@material-ui/core";
import { StartButton, JoinButton } from "../components/CustomButtons";
import { TableHeading } from "../components/CustomHeadings";
import {
  PastPracticeTable,
  UpcomingOrOngoingTable,
} from "../components/CustomTables";
import CreateDialog from "../dialogs/CreateDialog";
import socket from "../socket/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
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
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  function goToCodeUI() {
    history.push("/code");
  }

  function handleStartButtonClick() {
    setOpenCreateDialog(true);
  }

  function handleCreateDialogClose() {
    setOpenCreateDialog(false);
  }

  function handleDialogCreateInterviewButtonClick(value) {
    setOpenCreateDialog(false);
    fetch("/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty: value }),
    })
      .then((response) => response.json())
      .then((res) => {
        const id = res._id;
        const info = {};
        info.id = id;
        info.name = user.firstName + " " + user.lastName;
        info.userId = user.id;
        socket.emit("joinInterviewLobby", info, function (confimation) {});

        history.push(`/dashboard/waitingroom/${id}`);
      })
      .catch((err) => console.log(err));
  }

  if (user === null) {
    return <></>;
  } else if (user === "failed to fetch") {
    return <Redirect to="/login" />;
  } else {
    return (
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CreateDialog
          open={openCreateDialog}
          setOpen={setOpenCreateDialog}
          onClose={handleCreateDialogClose}
          onCreateClick={handleDialogCreateInterviewButtonClick}
        />
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
            <StartButton
              text="Start"
              marginRight="1rem"
              clickEvent={handleStartButtonClick}
            />
            <JoinButton text="Join" clickEvent={goToCodeUI} />
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
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
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
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <PastPracticeTable className={classes.table} />
            </TableContainer>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} />
      </Grid>
    );
  }
}

export default Dashboard;
