import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ data }) {
  const handleProgress = (state) => {
    const percentPlayed = (state.playedSeconds / state.loadedSeconds) * 100;

    if (percentPlayed >= 70) {
      console.log(true);
    }
  };

  return (
    <ReactPlayer
      playing={false}
      volume={0.2}
      controls
      url={data}
      width={"70%"}
      height={"70%"}
      onProgress={handleProgress}
    />
  );
}

export default VideoPlayer;
