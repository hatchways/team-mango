import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  IconButton,
  TextField,
  Avatar,
} from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import copy from "copy-to-clipboard";
import socket from "../socket/socket";
const waitingRoomStyle = (theme) => ({
  root: {
    backgroundColor: "#495074",
    height: "100vh",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    padding: ".5rem 0% 4.5rem 5%",
    [theme.breakpoints.up("sm")]: {
      padding: ".5rem 10% 4.5rem 10%",
    },
  },
  title: {
    color: "#4545F5",
    fontWeight: "800",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
  participants: {
    color: "#4545F5",
    fontWeight: "800",
    marginTop: "1rem",
    paddingBottom: "1rem",
  },
  menu: {
    textAlign: "center",
  },
  button: {
    borderRadius: 35,
    margin: ".3rem 0rem 0rem 0rem",
    padding: ".7rem 2.5rem .7rem 2.5rem",
  },
  link: {
    fontWeight: "700",
    margin: ".5rem 0 .5rem 0",
  },
  linkField: {
    width: "65%",
    marginRight: "1rem",
    minWidth: "270px",
  },
  avatar: {
    margin: ".4rem",
  },
  firstName: {
    margin: "1rem 0 0 .3rem",
  },
});

const defaultProps = {
  bgcolor: "background.paper",
  m: 0,
  border: 1,
  style: {
    width: "80%",
    height: "7rem",
    marginBottom: "1rem",
    padding: "2.5rem 0 2.5rem 2.5rem",
  },
};

function WaitingRoom(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [openRoom, setOpenRoom] = useState(true);
  const [fullUrlPath, setFullUrlPath] = useState("");
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [participants, setParticipants] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const [startEnabled, setstartEnabled] = useState(false);
  useEffect(() => {
    fetch(`/interviews/exists/${props.match.params.id}`)
      .then((result) => result.json())
      .then((res) => {
        let isTrueSet = res === "true";
        if (!isTrueSet && res != "JsonWebTokenError: jwt must be a string") {
          console.log(res);

          history.push("/dashboard");
        }
      });
  }, []);

  useEffect(() => {
    if (inRoom) {
      socket.emit(
        "joinInterviewLobby",
        {
          id: props.match.params.id,
          name: user.firstName + " " + user.lastName,
          userId: user.id,
        },
        function (confimation) {
          if (!confimation) {
            history.push("/dashboard");
          }
        }
      );
    }
    setFullUrlPath(window.location.href);
    return () => {
      if (user)
        socket.emit("leaveRoom", {
          id: props.match.params.id,
          name: user.firstName + " " + user.lastName,
          userId: user.id,
        });
    };
  }, [user]);
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  function handleStartButtonClick() {
    let otherUserSpot;
    if (participants.userIds.indexOf(user.id) === 1) {
      otherUserSpot = 0;
    } else {
      otherUserSpot = 1;
    }
    fetch(`/interviews/${props.match.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participantID: participants.userIds[otherUserSpot],
      }),
    });
    wait(500);
    socket.emit("startInterview", {
      id: props.match.params.id,
      participants: participants,
    });
    history.push(`/code/${props.match.params.id}`);
  }

  useEffect(() => {
    handleInRoom();
    socket.on("joinedRoom", (data) => {
      setParticipants(data);
      fetch(`/interviews/isowner/${props.match.params.id}`)
        .then((result) => result.json())
        .then((res) => {
          let isTrueSet = res === "true";
          if (data.userIds.length === 2 && isTrueSet) {
            setstartEnabled(true);
          } else setstartEnabled(false);
        })
        .catch(console.log("failed to verify interview ownership"));
    });
  }, []);

  useEffect(() => {
    socket.on("movetoCode", (id) => {
      history.push(`/code/${id}`);
    });
  }, []);

  const handleInRoom = () => {
    inRoom ? setInRoom(false) : setInRoom(true);
  };

  const handleClose = () => {
    history.push("/dashboard");
  };

  const shareClick = () => {
    copy(fullUrlPath);
  };

  const ItemList = () => {
    if (participants.userNames)
      return participants.userNames.map((item, i) => {
        return (
          <Box key={i} display="flex" direction="row">
            <Avatar className={classes.avatar} src={item.avatar} />
            <Typography className={classes.firstName}>{item}</Typography>
          </Box>
        );
      });
  };

  const { classes } = props;
  if (user === null) {
    return <></>;
  } else if (user === "failed to fetch") {
    return <></>;
  }
  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={"true"}
        maxWidth={"md"}
        open={openRoom}
        aria-labelledby="max-width-dialog-title"
        onClose={handleClose}
      >
        <DialogContent className={classes.dialog}>
          <Typography className={classes.title} variant="h3">
            Waiting Room
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            edge="start"
          >
            <CloseIcon />
          </IconButton>
          <Grid>
            <Typography className={classes.link} variant="h6">
              Share link
            </Typography>
            <TextField
              className={classes.linkField}
              id="outlined-basic"
              label={fullUrlPath}
              variant="outlined"
              disabled
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={shareClick}
              color="primary"
            >
              COPY
            </Button>
            <Typography className={classes.participants} variant="h4">
              Participants
            </Typography>
            <Box borderColor="grey.500" {...defaultProps}>
              {ItemList()}
            </Box>
            {startEnabled ? (
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleStartButtonClick}
                color="primary"
              >
                {" "}
                START
              </Button>
            ) : null}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(waitingRoomStyle)(WaitingRoom);
