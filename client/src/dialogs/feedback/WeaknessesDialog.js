import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
  FeedbackOutlinedButton,
  DialogCustomTextField,
} from "../../components/DialogCommonComponents";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [openSaveErrorSnackbar, setOpenSaveErrorSnackbar] = useState(false);
  const [openPleaseFillSnackbar, setOpenPleaseFillSnackbar] = useState(false);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    fetch(`/interviews/feedback/${match.params.id}/given`)
      .then((result) => result.json())
      .then((result) => {
        if (result.weaknesses) {
          setAnswerText(result.weaknesses);
        }
      });
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
        .catch((err) => setOpenSaveErrorSnackbar(true));
    } else {
      setOpenPleaseFillSnackbar(true);
    }
  };

  const handlePleaseFillSnackbarClose = () => {
    setOpenPleaseFillSnackbar(false);
  };
  const handleSaveErrorSnackbarClose = () => {
    setOpenSaveErrorSnackbar(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <Snackbar
        open={openPleaseFillSnackbar}
        autoHideDuration={6000}
        onClose={handlePleaseFillSnackbarClose}
      >
        <Alert onClose={handlePleaseFillSnackbarClose} severity="error">
          Please enter review
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSaveErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleSaveErrorSnackbarClose}
      >
        <Alert onClose={handleSaveErrorSnackbarClose} severity="error">
          An error occured. Please try again
        </Alert>
      </Snackbar>
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
