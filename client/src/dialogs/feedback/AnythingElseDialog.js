import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
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

const AnythingElseDialog = ({ onClose, onSubmitClick, match }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);
  const [openSaveErrorSnackbar, setOpenSaveErrorSnackbar] = useState(false);
  const [openPleaseFillSnackbar, setOpenPleaseFillSnackbar] = useState(false);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    fetch(`/interviews/feedback/${match.params.id}/given`)
      .then((result) => result.json())
      .then((result) => {
        if (result.anythingElse) {
          setAnswerText(result.anythingElse);
        }
      });
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
