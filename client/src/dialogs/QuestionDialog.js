import React, { useState, useContext } from "react";
import { Typography, Grid, IconButton, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";
import { useTheme } from "@material-ui/core/styles";

const QuestionDialogStyle = (theme) => ({
  root: {
    backgroundColor: "#495074",
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    padding: ".5rem 0% .5rem 0%",
    [theme.breakpoints.up("sm")]: {
      padding: ".5rem 5% .5rem 5%",
    },
  },
  title: {
    padding: "20px 30px 0px 30px",
  },
  question: {
    padding: "5px 0px 0px",
    fontFamily: '"Open Sans", "Roboto"',
  },
  menu: {
    textAlign: "center",
  },
  create: {
    borderRadius: 35,
    margin: "1rem 0rem 6rem 0rem",
    padding: ".7rem 2.5rem .7rem 2.5rem",
  },
});
const difficultyEnum = ["Beginner", "Intermediate", "Advanced", "Expert"];

function QuestionDialog(props) {
  const { user, setUser } = useContext(UserContext);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = () => {
    props.onClose();
  };

  const { classes } = props;
  const { children, ...otherProps } = props;
  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"sm"}
        open={props.open}
        aria-labelledby="max-width-dialog-title"
        onClose={handleClose}
      >
        <DialogContent className={classes.dialog}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            edge="start"
          >
            <CloseIcon />
          </IconButton>
          <Grid>
            <Typography className={classes.title} color="primary" variant="h5">
              {children.title}
            </Typography>

            <div
              className={classes.desc}
              style={{
                ".br": "display:block; margin-bottom: 0em",
              }}
              dangerouslySetInnerHTML={{
                __html: children.description,
              }}
              className={classes.question}
            ></div>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(QuestionDialogStyle)(QuestionDialog);
