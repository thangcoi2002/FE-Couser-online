import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function TableCourseSold({ data, onOpen, openDetail }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-nowrap">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên khóa học
            </th>
            <th scope="col" className="px-6 py-3">
              Nguời mua
            </th>
            <th scope="col" className="px-6 py-3">
              Tiến trình
            </th>
            <th scope="col" className="px-6 py-3">
              Giá tiền
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
                  {item.nameCourse}
                </th>
                <th className="px-6 py-4  font-medium text-gray-900 text-nowrap">
                  {item.studentId.fullName}
                </th>
                <td className="px-6 py-4">
                  {(item.progress.length / item.courseId.lesson.length) * 100 || 0} %
                </td>
                <td className="px-6 py-4 text-nowrap">
                  {item.courseId?.price?.toLocaleString("vi-VN") || 0} VNĐ
                </td>
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
  );
}

export default TableCourseSold;
