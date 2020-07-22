import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
  FeedbackOutlinedButton,
  DialogCustomTextField,
  CustomSnackbar,
} from "../../components/DialogCommonComponents";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

const WeaknessesDialog = ({
  onClose,
  onPreviousQuestionClick,
  onNextQuestionClick,
  match,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarErrorText, setSnackbarErrorText] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("error");
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    fetch(`/interviews/feedback/${match.params.id}/given`)
      .then((result) => result.json())
      .then((result) => {
        if (result.weaknesses) {
          setAnswerText(result.weaknesses);
        }
      }).catch(err => {});
  }, [match.params.id]);

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const onTextInputChange = (value) => {
    setAnswerText(value);
  };

  const previousButtonClick = () => {
    onPreviousQuestionClick();
  };

  const nextButtonClick = () => {
    if (answerText) {
      fetch(`/interviews/feedback/${match.params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weaknesses: answerText }),
      })
        .then((result) => onNextQuestionClick())
        .catch((err) =>
          handleSnackbarOpen("An error occured. Please try again")
        );
    } else {
      handleSnackbarOpen("Please enter review");
    }
  };

  const handleSnackbarOpen = (message, severity = "error") => {
    setSnackbarErrorText(message);
    setSnackBarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <CustomSnackbar
        open={openSnackbar}
        severity={snackBarSeverity}
        onClose={handleSnackbarClose}
      >
        {snackbarErrorText}
      </CustomSnackbar>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <QuestionTextAndNo
          questionNo="4"
          questionText="What are some things this candidate can improve on (the more specific the better)"
        />
        <DialogCustomTextField onChange={onTextInputChange} text={answerText} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <FeedbackOutlinedButton onClick={() => previousButtonClick()}>
              Previous Question
            </FeedbackOutlinedButton>
          </Grid>
          <Grid item>
            <FeedbackBlueButton onClick={() => nextButtonClick()}>
              Next Question
            </FeedbackBlueButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default WeaknessesDialog;
