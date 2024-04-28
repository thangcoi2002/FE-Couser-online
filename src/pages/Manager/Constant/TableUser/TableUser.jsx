import { Link } from "react-router-dom";

function TableUser({ data, onOpen }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tài khoản
            </th>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>

            <th scope="col" className="px-6 py-3">
              Số điện thoại
            </th>

            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">
              Giời tính
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
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
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                  {item.username}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                  {item.fullName}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">
                  {item.gender === 0 ? "Nam" : "Nữ"}
                </td>
                <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString('vi-VN')}</td>
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
  );
}

export default TableUser;
