import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function LessonItem({ data, arrayData, index, openModal, received }) {
  const { role, token } = useContext(AuthContext);
  const navigate = useNavigate();
  let linkNavigate = null;

  if (role === 1) {
    linkNavigate = () =>
      navigate(routes.detailLesson.replace(":id", data._id), {
        state: { arrayData },
      });
  } else if (role === 2 && received) {
    linkNavigate = () =>
      navigate(routes.detailLesson.replace(":id", data._id), {
        state: { arrayData },
      });
  } else if (!token) {
    linkNavigate = () => navigate(routes.login);
  }

  return (
    <button
      onClick={linkNavigate}
      className="flex w-full text-left border my-4 rounded-md overflow-hidden"
    >
      <div className="w-full flex justify-between p-4">
        <div className={`${!openModal ? "w-full" : "w-3/4"}`}>{`${index + 1}. ${
          data.nameLesson
        }`}</div>
        {openModal && (
          <div className="flex items-center">
            <button
              className="text-blue-500 px-4"
              onClick={() =>
                navigate(routes.handleLesson, {
                  state: { status: "Edit", courseId: data._id },
                })
              }
            >
              Sửa
            </button>
            <button
              className="text-red-500 px-4"
              onClick={() => openModal(data._id)}
            >
              Xóa
            </button>
          </div>
        )}
      </div>
    </button>
  );
}

export default LessonItem;
