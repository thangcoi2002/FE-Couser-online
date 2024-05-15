import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import * as recruitmentService from "~/services/recruitmentService";
import { AuthContext } from "~/shared/AuthProvider";
import Modal from "~/components/Modal";

function Recruitment() {
  const { role } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [nameRecruitment, setNameRecruitment] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [getIdModal, setGetIdModal] = useState("");
  const [body, setBody] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onChange = (e) => {
    setNameRecruitment(e.target.value);
  };

  const fetch = useCallback(() => {
    recruitmentService
      .getAllRecruitment({})
      .then((recruitment) => {
        setData(recruitment.data);
        setTotalPage(recruitment.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage, nameRecruitment]);

  const onClose = () => {
    setShowModal(false);
    setBody("");
  };

  const onOpen = (id) => {
    setShowModal(true);
    setGetIdModal(id);
  };

  const openDetail = (description) => {
    setShowModal(true);
    setBody(<div dangerouslySetInnerHTML={{ __html: description }} />);
  };

  const onDelete = () => {};

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="w-full px-10">
      <div className="flex justify-end my-4">
        <div className="md:w-1/3 w-full flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <input
            placeholder="Tìm kiếm tên khóa học..."
            className="w-full pl-4 outline-none p-2"
            onChange={onChange}
            value={nameRecruitment || ""}
            name="nameRecruitment"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-nowrap">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên khóa học
              </th>
              <th>Mô tả</th>
              <th scope="col" className="px-6 py-3">
                Số lượng tuyển dụng
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  className="bg-white border-b hover:bg-gray-100 "
                  key={item._id}
                >
                  <th className="px-6 py-4  font-medium text-gray-900">
                    {item.nameRecruitment}
                  </th>
                  <td className="px-2 py-4 text-right">
                    <FaEye
                      className="cursor-pointer"
                      onClick={() => openDetail(item.description)}
                    />
                  </td>
                  <td className="px-6 py-4 text-nowrap">0 / {item.quantity}</td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
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
        title={body ? "Mô tả khóa học" : "Xóa khóa học"}
        description={"Bạn chắc chắn xóa khóa học?"}
        showModal={showModal}
        onClose={onClose}
        onSubmit={onDelete}
        body={body}
      />
    </div>
  );
}

export default Recruitment;
