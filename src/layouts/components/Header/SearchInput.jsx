
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function SearchInput() {
    const navigate = useNavigate();
    const [nameCourse, setNameCourse] = useState("");
  
    const onSearch = () => {
      navigate(`${routes.courses}?nameCourse=${nameCourse}`);
    };

  return (
    <div className="w-1/3 sm:w-1/2 flex items-center border border-gray-300 rounded-xl overflow-hidden">
      <input
        placeholder="Nhập tên khóa học..."
        value={nameCourse}
        name={nameCourse}
        onChange={(e) => setNameCourse(e.target.value)}
        className="w-full pl-4 py-2 outline-none"
      />
      <CiSearch
        className="cursor-pointer w-10 h-10 p-2 text-gray-400"
        onClick={onSearch}
      />
    </div>
  );
}

export default SearchInput;
