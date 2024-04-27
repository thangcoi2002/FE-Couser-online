import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ data }) {
  return (
      <ReactPlayer playing={false} volume={0.2} controls url={data}/>
  );
}

export default VideoPlayer;
