import React, { useState, useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TableContainer, Paper } from "@material-ui/core";
import { StartButton, JoinButton } from "../components/CustomButtons";
import { TableHeading } from "../components/CustomHeadings";
import {
  PastPracticeTable,
  UpcomingOrOngoingTable,
} from "../components/CustomTables";
import { UserContext } from "../contexts/UserContext";
import OverallDialog from "../dialogs/feedback/OverallDialog";
import ReviewDialog from "../dialogs/feedback/ReviewDialog";
import StrengthsDialog from "../dialogs/feedback/StrengthsDialog";
import WeaknessesDialog from "../dialogs/feedback/WeaknessesDialog";
import RecommendationsDialog from "../dialogs/feedback/RecommendationsDialog";
import AnythingElseDialog from "../dialogs/feedback/AnythingElseDialog";
import CreateDialog from "../dialogs/CreateDialog";

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
    history.push("/dashboard/waitingroom/1");
  }

  const handleFeedbackDialogsClose = (value) => {
    history.push("/dashboard");
  };

  const handleOvearllNextQuestionClick = () => {
    history.push("/dashboard/feedback/2?id=345");
  };

  const handleReviewDialogNext = () => {
    history.push("/dashboard/feedback/3?id=777");
  };

  const handleReviewDialogPrevious = () => {
    history.push("/dashboard/feedback/1");
  };

  const handleStrengthsDialogNext = () => {
    history.push("/dashboard/feedback/4");
  };

  const handleStrengthsDialogPrevious = () => {
    history.push("/dashboard/feedback/2");
  };

  const handleWeaknessesDialogNext = () => {
    history.push("/dashboard/feedback/5");
  };

  const handleWeaknessesDialogPrevious = () => {
    history.push("/dashboard/feedback/3");
  };

  const handleRecommendationDialogNext = () => {
    history.push("/dashboard/feedback/6");
  };

  const handleRecommendationDialogPrevious = () => {
    history.push("/dashboard/feedback/4");
  };

  const handleAnythingElseSubmitClick = () => {
    console.log("Submit clicked");
    history.push("/dashboard");
  };

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
        <OverallDialog
          onClose={handleFeedbackDialogsClose}
          onNextQuestionClick={handleOvearllNextQuestionClick}
        />
        <ReviewDialog
          onClose={handleFeedbackDialogsClose}
          onNextQuestionClick={handleReviewDialogNext}
          onPreviousQuestionClick={handleReviewDialogPrevious}
        />
        <StrengthsDialog
          onClose={handleFeedbackDialogsClose}
          onNextQuestionClick={handleStrengthsDialogNext}
          onPreviousQuestionClick={handleStrengthsDialogPrevious}
        />
        <WeaknessesDialog
          onClose={handleFeedbackDialogsClose}
          onNextQuestionClick={handleWeaknessesDialogNext}
          onPreviousQuestionClick={handleWeaknessesDialogPrevious}
        />
        <RecommendationsDialog
          onClose={handleFeedbackDialogsClose}
          onNextQuestionClick={handleRecommendationDialogNext}
          onPreviousQuestionClick={handleRecommendationDialogPrevious}
        />
        <AnythingElseDialog
          onClose={handleFeedbackDialogsClose}
          onSubmitClick={handleAnythingElseSubmitClick}
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
