import { useEffect, useState } from "react";

import Bars from "~/components/Chart/Bars";
import * as courseService from "~/services/courseService";

function HomeManager() {
  const labelsMonths = [];
  const [titleHover, setTitleHover] = useState();
  const [dataBar, setDataBar] = useState([123]);
  const [labelsTopCourse, setLabelsTopCourse] = useState([]);
  const [dataBarCourse, setDataBarCourse] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  for (var i = 1; i <= 12; i++) {
    labelsMonths.push(`Tháng ${i}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await courseService.getAllCourse({ perPage: 10 });
        const courseData = res.data.data.map(course => course.nameCourse);
        setTitleHover(courseData);

        const labelsArray = Array.from({ length: courseData.length }, (_, index) => `Top ${index + 1}`);

        setLabelsTopCourse(labelsArray);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full my-10">
      <Bars
        title={"Doanh thu"}
        labels={labelsMonths}
        dataBar={dataBar}
      />

      <Bars
        title={"Top 10 khóa học"}
        labels={labelsTopCourse}
        dataBar={dataBarCourse}
        titleHover={titleHover}
      />
    </div>
  );
}

export default HomeManager;
