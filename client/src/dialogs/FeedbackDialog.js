import React, { useState, useContext } from "react";
import { Typography, Grid, IconButton, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";
import { useTheme } from "@material-ui/core/styles";

const FeedbackDialogStyle = (theme) => ({
  root: {
    backgroundColor: "#495074",
  },

  dialogPaper: {
    minHeight: "80vh",
    minWidth: "60vh",
  },
  selected: {
    paddingTop: "10px",
    paddingLeft: "10px",
    paddingBottom: "10px",
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
  text: {
    padding: ".5rem .5rem .5rem .5rem",
  },
  title: {
    padding: "20px 30px 20px 30px",
    marginTop: "10px",
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

function FeedbackDialog(props) {
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
        classes={{ paper: classes.dialogPaper }}
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

          <Paper className={classes.feedBack}>
            <Typography className={classes.title} color="primary" variant="h5">
              Overall Score : {children.overallScore}
            </Typography>

            {children.review ? (
              <div>
                <Box className={classes.selected}>
                  <Typography color="primary" variant="h7">
                    Code Efficiency : {"     "}
                  </Typography>

                  {children.review.codeEfficiency}

                  <br></br>
                </Box>
                <Box className={classes.selected}>
                  <Typography color="primary" variant="h7">
                    Code Organization : {"     "}
                  </Typography>
                  {children.review.codeOrganization}
                  <br></br>
                </Box>
                <Box className={classes.selected}>
                  <Typography color="primary" variant="h7">
                    Communication Skills : {"     "}
                  </Typography>
                  {children.review.communicationSkills}
                  <br></br>
                </Box>
                <Box className={classes.selected}>
                  <Typography color="primary" variant="h7">
                    Debugging Skills : {"     "}
                  </Typography>
                  {children.review.debuggingSkills}
                  <br></br>
                </Box>
                <Box className={classes.selected}>
                  <Typography color="primary" variant="h7">
                    ProblemSolving Skills: {"     "}
                  </Typography>
                  {children.review.problemSolvingSkills}
                  <br></br>
                </Box>
                <Box className={classes.selected}>
                  <Typography color="primary" variant="h7">
                    Speed : {"     "}
                  </Typography>
                  {children.review.speed}
                  <br></br>
                </Box>
              </div>
            ) : (
              <></>
            )}
            <Box className={classes.selected}>
              <Typography color="primary" variant="h7">
                Anything Else:
              </Typography>
              <Paper className={classes.text}>{children.anythingElse}</Paper>
            </Box>
            <Box className={classes.selected}>
              <Typography color="primary" variant="h7">
                Recommendations:
              </Typography>
              <Paper className={classes.text}>{children.recommendations}</Paper>
            </Box>
            <Box className={classes.selected}>
              <Typography color="primary" variant="h7">
                Strengths:
              </Typography>
              <Paper className={classes.text}>{children.strengths}</Paper>
            </Box>
            <Box className={classes.selected}>
              <Typography color="primary" variant="h7">
                Weaknesses:{" "}
              </Typography>
              <Paper className={classes.text}>{children.weaknesses}</Paper>
            </Box>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(FeedbackDialogStyle)(FeedbackDialog);
