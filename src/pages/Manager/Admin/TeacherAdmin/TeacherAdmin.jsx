import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Modal from "~/components/Modal";

import * as authService from "~/services/authService";

function TeacherAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onChange = (e) => {
    setFullName(e.target.value);
  };
  const onClose = () => {
    setShowModal(false);
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const fetch = useCallback(() => {
    authService
      .getTeacher({
        page: currentPage,
        perPage: 10,
        fullName: fullName,
      })
      .then((course) => {
        setData(course.data);
        setTotalPage(course.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, fullName]);

  const onDelete = () => {
    authService
      .deleteUser({
        id: getIdModal,
      })
      .then(() => {
        fetch();
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="w-full px-10">
      <div className="flex justify-end my-4">
        <div className="md:w-1/3 w-full flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <input
            placeholder="Tìm kiếm theo tên ..."
            className="w-full pl-4 outline-none p-2"
            onChange={onChange}
            value={fullName || ""}
            name="fullName"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Họ và tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Giới tính
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  className="bg-white border-b hover:bg-gray-100 "
                  key={item._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.fullName}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    {item.gender === 0 ? "Nam" : "Nữ"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/manager/admin/user/edit/${item._id}`}
                      className="font-medium p-2 text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Sửa
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => onOpen(item._id)}
                      className="font-medium p-2 text-red-600 dark:text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  There is no data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        pageCount={totalPage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"underline"}
        previousLabel={currentPage === 1 ? null : <IoIosArrowBack />}
        nextLabel={currentPage >= totalPage ? null : <IoIosArrowForward />}
        className="flex justify-end mt-4"
        pageLinkClassName={"p-3"}
        pageClassName={"my-auto"}
        nextLinkClassName={"p-3"}
        previousLinkClassName={"p-3"}
        previousClassName={"my-auto"}
        nextClassName={"my-auto"}
        breakLinkClassName={"p-3"}
        breakClassName={"my-auto"}
      />

      <Modal
        title="Delete course"
        description={"Are you sure to delete the course?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
      />
    </div>
  );
}

export default TeacherAdmin;
