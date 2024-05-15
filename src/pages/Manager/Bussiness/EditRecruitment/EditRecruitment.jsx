import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import routes from "~/config/routes";
import * as recruitmentService from "~/services/recruitmentService";

function EditRecruitment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState({
    nameRecruitment: "",
    quantity: 0,
  });
  const [description, setDescription] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["size", "link"],
    ],
  };

  const onChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataPut = {
      nameRecruitment: data.nameRecruitment,
      description: description,
      quantity: data.quantity,
    };
    recruitmentService
      .editRecruitment({ id, data: dataPut })
      .then(navigate(routes.recruitment))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setData(location.state.data);
    setDescription(location.state.data.description);
  }, [location.state]);

  return (
    <form onSubmit={onSubmit} className="w-3/4 mx-auto mt-10">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="nameRecruitment"
          id="nameRecruitment"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={onChange}
          value={data.nameRecruitment}
        />
        <label
          htmlFor="nameRecruitment"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tên tuyển dụng
        </label>
      </div>

      <input
        type="number"
        name="quantity"
        placeholder="Số lượng"
        value={data.quantity}
        onChange={onChange}
        className="border w-full mb-4 rounded py-2 px-2 outline-none"
      />

      <ReactQuill
        theme="snow"
        value={description}
        onChange={setDescription}
        modules={modules}
      />

      <div className="flex mt-4 justify-center w-full">
        <button
          type="submit"
          className=" bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
}

export default EditRecruitment;
