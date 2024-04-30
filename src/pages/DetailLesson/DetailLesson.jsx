import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "~/components/VideoPlayer";

import * as lessonService from "~/services/lessonService";

function DetailLesson() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    lessonService
      .getLessonById({ id })
      .then((lesson) => {
        setData(lesson.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <div className="text-center font-bold">{data.nameLesson}</div>
      <div className="w-full flex justify-center mt-4">
        <VideoPlayer data={data.videoUrl} />
      </div>
    </div>
  );
}

export default DetailLesson;
