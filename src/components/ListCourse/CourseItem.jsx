import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";

import Modal from "../Modal";
import * as courseService from "~/services/courseService";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function CourseItem({ data, onClickBuy }) {
  const navigate = useNavigate();
  const { token, role } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [received, setReceived] = useState(false);

  const fetch = useCallback(() => {
    if (token) {
      courseService
        .getMyCourse({})
        .then((course) => {
          const checked = course.data.data.filter(
            (item) => item.courseId._id === data._id
          );
          if (checked.length > 0) {
            setReceived(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data._id, token]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    setShowModal(false);
    onClickBuy(data);
  };

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-red-200 to-red-100 border border-gray-100 rounded-lg shadow-2xl">
      <div className="h-[350px]">
        <Link to={`/course/${data._id}`}>
          <img
            className="p-8 rounded-t-lg w-full max-w-sm mb-10"
            src={data.imageUrl}
            alt="product image"
          />
        </Link>
      </div>
      <div className="px-5 pb-5 w-full h-[200px]">
        <Link to={`/course/${data._id}`}>
          <p className="text-xl font-semibold h-[110px] overflow-hidden tracking-tight text-black">
            {data.nameCourse}
          </p>
          {data.teacherId && (
            <p className="text-xl font-medium tracking-tight text-gray-500">
              {data.teacherId.fullName}
            </p>
          )}
        </Link>
       {role === 2 && <div className="flex items-center  justify-between relative">
          <span className="text-3xl font-bold text-black">
            {data.price > 0
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.price)
              : "Get free"}
          </span>
          <button
            onClick={() => {
              received ? navigate(routes.myCourses) : setShowModal(true);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {received ? "Received" : data.price > 0 ? "Buy" : "Get free"}
          </button>
        </div>}
      </div>
      <Modal
        title="Buy course"
        description={"Are you sure to buy the course?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
}

CourseItem.propTypes = {
  data: PropTypes.object,
  onClickBuy: PropTypes.func,
};

export default CourseItem;
