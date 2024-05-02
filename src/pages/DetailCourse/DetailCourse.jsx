import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListLesson from "~/components/ListLesson";
import Modal from "~/components/Modal";
import routes from "~/config/routes";

import * as courseService from "~/services/courseService";
import * as myCourseService from "~/services/myCourseService";
import * as paymentService from "~/services/paymentService";
import { AuthContext } from "~/shared/AuthProvider";

function DetailCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [received, setReceived] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    courseService
      .getCourseById({ id })
      .then((course) => {
        setData(course.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (token) {
      myCourseService
        .getMyCourse({})
        .then((course) => {
          const checkPurchased = course.data.filter(
            (item) => item.courseId._id === id
          );
          if (checkPurchased.length > 0) {
            setReceived(true);
          } else {
            setReceived(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const fetch = (courseId) => {
    myCourseService
      .buyCourse({ courseId })
      .then((course) => {
        if (course) {
          alert("Mua thành công");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPayment = (dataCourse) => {
    const dataPayment = {
      amount: dataCourse.price,
      language: "vn",
      myCourseId: dataCourse._id,
      bankCode: "",
    };
    paymentService
      .createUrlVnPay({ data: dataPayment })
      .then((response) => {
        if (response.status == 200) {
          window.location.href = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickBuy = (dataCourse) => {
    if (token) {
      if (!dataCourse.price || dataCourse.price === 0) {
        fetch(dataCourse._id);
      } else {
        fetchPayment(dataCourse);
      }
    } else {
      navigate(routes.login);
    }
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    setShowModal(false);
    onClickBuy(data);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col-reverse sm:flex-row items-center">
        <div className="w-1/2 flex flex-col justify-center items-center mt-4 sm:mb-0">
          <p className="text-2xl font-bold">{data.nameCourse}</p>
          {role === 1 ||
            (!received && (
              <>
                <p className="my-4 text-xl">
                  {data.price > 0
                    ? `${data.price.toLocaleString("vi-vn")} VNĐ`
                    : "Miễn phí"}
                </p>
                <button
                  className="w-[160px] h-[48px] rounded-md bg-black text-white font-medium "
                  onClick={() => {
                    received ? navigate(routes.myCourse) : setShowModal(true);
                  }}
                >
                  {data.price > 0 ? "Mua ngay" : "Nhận miễn phí"}
                </button>
              </>
            ))}
        </div>
        <div className="w-full sm:w-1/2 flex justify-center border-l border-neutral-200 items-center">
          <img src={data.imageUrl} alt="" />
        </div>
      </div>

      <div className="mt-10">
        {data.teacherId && (
          <Link to={`/teacher/${data.teacherId?._id}`}>
            <div className="inline-flex">
              <img
                src={data.teacherId?.imageUrl}
                alt=""
                className="w-[100px] h-[100px] rounded-full shadow-xl object-cover"
              />
              <div className="mx-4 mt-4">
                <p className="font-bold ">{data.teacherId.fullName}</p>
                <p className="text-gray-500">{data.teacherId.address}</p> 
              </div>
            </div>
          </Link>
        )}

        <p className="my-4 text-center text-2xl font-bold">Mô tả khóa học</p>
        <p>{data.description}</p>
      </div>

      <p className="my-4 text-center text-2xl font-bold">Bài giảng</p>
      <ListLesson data={data.lesson} received={received} />

      <Modal
        title="Mua khóa học"
        description={"Bạn chắc chắn mua khoa học này?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default DetailCourse;
