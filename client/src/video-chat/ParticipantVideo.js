import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    right: 0,
  },
  local: {
    maxWidth: "200px",
    maxHeight: "200px",
    right: 0,
    zIndex: 10,
  },
  remote: {
    maxWidth: "400px",
    maxHeight: "400px",
    right: 0,
    zIndex: 5,
  },
}));

const ParticipantVideo = ({ participant, remote }) => {
  const classes = useStyles();
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

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
    console.log("remote is true");
    let styleClass = classes.remote;
  } else {
    console.log("remote is false");
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
    </div>
  );
};

export default ParticipantVideo;
