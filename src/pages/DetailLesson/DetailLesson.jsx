import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ListLesson from "~/components/ListLesson";
import VideoPlayer from "~/components/VideoPlayer";

import * as lessonService from "~/services/lessonService";

function DetailLesson() {
  const { id } = useParams();
  const location = useLocation()
  const { arrayData } = location?.state;
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
    <div className="px-4">
      <div className="text-center font-bold">{data.nameLesson}</div>
      <div className="w-full flex justify-center mt-4">
        <VideoPlayer data={data.videoUrl} />
      </div>

      <ListLesson data={arrayData} />
    </div>
  );
}

export default DetailLesson;
