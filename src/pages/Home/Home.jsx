import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ListCourse from "~/components/ListCourse";
import routes from "~/config/routes";
import * as courseService from "~/services/courseService";
import LogoWeb from "~/assets/img/LogoWeb.png";

function Home() {
  const title = document.title;
  const [dataCourse, setDataCourse] = useState([]);

  useEffect(() => {
    courseService
      .getAllCourse({ perPage: 6 })
      .then((course) => {
        setDataCourse(course.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="lg:flex items-center justify-center py-20 bg-gradient-to-br from-green-700 to-primary select-none mb-10">
        <div className="lg:w-1/2 px-6 md:px-28 text-white font-semibold">
          &nbsp; &nbsp; &nbsp; Chào mừng đến với {title}!
          <br />
          &nbsp; &nbsp; &nbsp; Tại {title}, chúng tôi tận tâm xây dựng một cộng
          đồng học tập đa dạng và phong phú, nơi mọi người có thể truy cập vào
          kiến thức và kỹ năng cần thiết để phát triển bản thân và thúc đẩy sự
          nghiệp.
          <br />
          &nbsp; &nbsp; &nbsp; Chúng tôi hiểu rằng hành trình học tập không chỉ
          là về việc tích lũy kiến thức, mà còn là về việc khám phá bản thân và
          mở rộng tầm nhìn. Vì vậy, chúng tôi cam kết cung cấp cho bạn những
          khóa học chất lượng cao, được thiết kế đặc biệt để đáp ứng nhu cầu và
          mong muốn của mọi người.
          <br />
          &nbsp; &nbsp; &nbsp; Dù bạn muốn nâng cao kỹ năng hiện tại, chuyển đổi
          sang một lĩnh vực mới, hay đơn giản là muốn tham gia vào một cộng đồng
          học tập sôi động, chúng tôi có mọi thứ bạn cần để thành công.
          <br />
          &nbsp; &nbsp; &nbsp; Hãy khám phá các khóa học tuyệt vời của chúng tôi
          và bắt đầu hành trình mới của bạn ngay hôm nay. Chúng tôi tin rằng mỗi
          bước tiến trong hành trình học tập của bạn đều đáng giá và sẽ dẫn bạn
          đến thành công.
          <br />
          &nbsp; &nbsp; &nbsp; Cảm ơn bạn đã đồng hành cùng chúng tôi trên hành
          trình này!
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src={LogoWeb}
            style={{ filter: "drop-shadow(15px 15px 5px rgba(0,0,0,.6)" }}
          />
        </div>
      </div>
      <ListCourse data={dataCourse} />

      <div className="w-full flex justify-center">
        <Link
          to={routes.listCourse}
          className="py-4 px-10 border border-primary hover:bg-primary hover:text-white rounded-xl mt-10"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
}

export default Home;
