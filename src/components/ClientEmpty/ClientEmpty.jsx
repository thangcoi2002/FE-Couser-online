import { MdDeleteForever } from "react-icons/md";

function ClientEmpty({title}) {
  return (
    <div className="flex flex-col justify-center items-center my-4">
      <MdDeleteForever size={80} className="text-red-500" />
      <p className="text-xl text-gray-500 font-bold mt-4">{title || "Không có dữ liệu!"}</p>
    </div>
  );
}

export default ClientEmpty;
