import React, { useState, useEffect, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    right: 0,
  },
  local: {
    maxWidth: 60,
    right: 0,
    zIndex: 10,
    borderTopRightRadius: "5px",
  },
  remote: {
    maxWidth: 250,
    right: 0,
    zIndex: 5,
    borderRadius: "5px",
  },
  dot: {
    height: "5px",
    width: "5px",
    backgroundColor: "#64FF33",
    borderRadius: "50%",
    display: "inline-block",
  }
}));

const ParticipantVideo = ({ participant, remote }) => {
  const classes = useStyles();
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const { user } = useContext(UserContext);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  if (remote) {
    let styleClass = classes.remote;
  } else {
    let styleClass = classes.local;
  }

  return (
    <div className={classes.root}>
      <video
        ref={videoRef}
        autoPlay={true}
        className={`${remote ? classes.remote : classes.local}`}
      />
      <audio ref={audioRef} autoPlay={true} muted={true} />
      {remote && 
        <div>
        <span className={classes.dot}></span>&nbsp;
        {user.firstName}
        </div>
      }
    </div>
  );
};

export default ParticipantVideo;
