import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
  DialogCustomTextField,
} from "../../components/DialogCommonComponents";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

const AnythingElseDialog = ({ onClose, onSubmitClick }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);

  const onTextInputChange = (value) => {
    console.log(value);
  };

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const handleSubmitClick = () => {
    onSubmitClick();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <QuestionTextAndNo questionNo="6" questionText="Anything else?" />
        <DialogCustomTextField onChange={onTextInputChange} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <FeedbackBlueButton text="Submit" clickEvent={handleSubmitClick} />
      </DialogActions>
    </Dialog>
  );
};

export default AnythingElseDialog;
