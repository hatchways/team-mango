import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory, useLocation, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TableContainer, Paper } from "@material-ui/core";
import { StartButton } from "../components/CustomButtons";
import { TableHeading } from "../components/CustomHeadings";
import {
  PastPracticeTable,
  UpcomingOrOngoingTable,
} from "../components/CustomTables";
import { UserContext } from "../contexts/UserContext";
import CreateDialog from "../dialogs/CreateDialog";
import OverallDialog from "../dialogs/feedback/OverallDialog";
import ReviewDialog from "../dialogs/feedback/ReviewDialog";
import StrengthsDialog from "../dialogs/feedback/StrengthsDialog";
import WeaknessesDialog from "../dialogs/feedback/WeaknessesDialog";
import RecommendationsDialog from "../dialogs/feedback/RecommendationsDialog";
import AnythingElseDialog from "../dialogs/feedback/AnythingElseDialog";
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
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  function handleStartButtonClick() {
    setOpenCreateDialog(true);
  }

  function handleCreateDialogClose() {
    setOpenCreateDialog(false);
  }
  useEffect(() => {
    socket.on("movetoCode", (id) => {
      history.push(`/code/${id}`);
    });
  }, []);
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

  const handleFeedbackDialogsClose = (value) => {
    history.push("/dashboard");
  };

  const handleFeedbackNextQuestionClick = () => {
    const pathname = location.pathname;
    const pathnameSplit = pathname.split("/");
    const newPath =
      "/dashboard/" +
      pathnameSplit[2] +
      "/feedback/" +
      (parseInt(pathnameSplit[4]) + 1);
    history.push(newPath);
  };

  const handleFeedbackPreviousQuestionClick = () => {
    const pathname = location.pathname;
    const pathnameSplit = pathname.split("/");
    const newPath =
      "/dashboard/" +
      pathnameSplit[2] +
      "/feedback/" +
      (parseInt(pathnameSplit[4]) - 1);
    history.push(newPath);
  };

  const handleFeedbackSubmitClick = () => {};

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
        <Route path="/dashboard/:id/feedback/1">
          <OverallDialog
            onClose={handleFeedbackDialogsClose}
            onNextQuestionClick={handleFeedbackNextQuestionClick}
          />
        </Route>
        <Route path="/dashboard/:id/feedback/2">
          <ReviewDialog
            onClose={handleFeedbackDialogsClose}
            onNextQuestionClick={handleFeedbackNextQuestionClick}
            onPreviousQuestionClick={handleFeedbackPreviousQuestionClick}
          />
        </Route>
        <Route path="/dashboard/:id/feedback/3">
          <StrengthsDialog
            onClose={handleFeedbackDialogsClose}
            onNextQuestionClick={handleFeedbackNextQuestionClick}
            onPreviousQuestionClick={handleFeedbackPreviousQuestionClick}
          />
        </Route>
        <Route path="/dashboard/:id/feedback/4">
          <WeaknessesDialog
            onClose={handleFeedbackDialogsClose}
            onNextQuestionClick={handleFeedbackNextQuestionClick}
            onPreviousQuestionClick={handleFeedbackPreviousQuestionClick}
          />
        </Route>
        <Route path="/dashboard/:id/feedback/5">
          <RecommendationsDialog
            onClose={handleFeedbackDialogsClose}
            onNextQuestionClick={handleFeedbackNextQuestionClick}
            onPreviousQuestionClick={handleFeedbackPreviousQuestionClick}
          />
        </Route>
        <Route path="/dashboard/:id/feedback/6">
          <AnythingElseDialog
            onClose={handleFeedbackDialogsClose}
            onSubmitClick={handleFeedbackSubmitClick}
          />
        </Route>
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
