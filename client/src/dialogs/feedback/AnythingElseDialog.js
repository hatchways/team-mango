import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
  DialogCustomTextField,
  CustomSnackbar,
} from "../../components/DialogCommonComponents";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

const AnythingElseDialog = ({ onClose, onSubmitClick, match }) => {
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
        if (result.anythingElse) {
          setAnswerText(result.anythingElse);
        }
      }).catch(err => {});
  }, [match.params.id]);

  const onTextInputChange = (value) => {
    setAnswerText(value);
  };

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const handleSubmitClick = () => {
    if (answerText) {
      fetch(`/interviews/feedback/${match.params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anythingElse: answerText }),
      })
        .then((result) => onSubmitClick())
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
        <QuestionTextAndNo questionNo="6" questionText="Anything else?" />
        <DialogCustomTextField onChange={onTextInputChange} text={answerText} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <FeedbackBlueButton onClick={() => handleSubmitClick()}>
          Submit
        </FeedbackBlueButton>
      </DialogActions>
    </Dialog>
  );
};

export default AnythingElseDialog;
