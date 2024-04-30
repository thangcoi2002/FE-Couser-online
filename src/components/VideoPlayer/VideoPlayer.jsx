import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ data }) {
  return (
    <ReactPlayer
      playing={false}
      volume={0.2}
      controls
      url={data}
      width={"60%"}
      height={"60%"}
    />
  );
}

export default VideoPlayer;
