import { MdDeleteForever } from "react-icons/md";

function ClientEmpty() {
  return (
    <div className="flex flex-col justify-center items-center my-4">
      <MdDeleteForever size={100} className="text-red-500" />
      <p className="text-2xl font-bold">Không có dữ liệu!</p>
    </div>
  );
}

export default ClientEmpty;
