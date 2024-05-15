import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

import { getAllRecruitment } from "~/services/recruitmentService";
import { AuthContext } from "~/shared/AuthProvider";

function ListRecruitment() {
  const {role,token} = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [body, setBody] = useState("");
  const [dataApply, setDataApply] = useState({
    fileCV: "",
    recruitmentId: "",
  });

  const onClose = () => {
    setShowModal(false);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const onOpen = (item) => {
    setShowModal(true);
    setBody(<div dangerouslySetInnerHTML={{ __html: item.description }} />);
    setDataApply({ fileCV: "", recruitmentId: item._id });
  };

  console.log(dataApply);

  const apply = () => {};

  useEffect(() => {
    getAllRecruitment({ page: currentPage, perPage: 10 })
      .then((recruitment) => {
        setData(recruitment.data);
        setTotalPage(recruitment.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  return (
    <div className={`${showModal && "flex"} mx-10 `}>
      <div className={`${showModal && "w-2/3"}`}>
        {data.map((item) => (
          <button
            key={item._id}
            className="border w-full my-2 text-left rounded-xl p-4"
            onClick={() => onOpen(item)}
          >
            {item.nameRecruitment}
          </button>
        ))}

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
      </div>

      {showModal && (
        <div className="w-1/3 px-4 ml-4 border-l">
          <div>{body}</div>
          {token && role ===2 && <div className="border-t mt-10">
            <input type="file" name="" id="fileCV" className="opacity-0" />
            <label
              htmlFor="fileCV"
              className="border w-full px-4 py-3 rounded-xl flex justify-start cursor-pointer "
            >
              Tải lên CV
            </label>
          </div>}
        </div>
      )}
    </div>
  );
}

export default ListRecruitment;
