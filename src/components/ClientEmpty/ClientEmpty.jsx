import { MdDeleteForever } from "react-icons/md";

function ClientEmpty() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MdDeleteForever size={100} className="text-red-500" />
      <p className="text-2xl font-bold">There is no data</p>
    </div>
  );
}

export default ClientEmpty;
