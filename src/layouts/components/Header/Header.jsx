import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { FaHome } from "react-icons/fa";

import Menu from "./Menu";
import { useContext, useState } from "react";
import { AuthContext } from "~/shared/AuthProvider";
import SearchInput from "./SearchInput";

function Header() {
  const { token } = useContext(AuthContext);

  return (
    <div className="py-4 w-full flex justify-around items-center">
      <Link to={routes.home} className="p-2 hidden sm:block">
        <FaHome size={30} />
      </Link>

      <SearchInput />

      {token ? (
        <Menu />
      ) : (
        <div>
          <Link
            to={routes.login}
            className="bg-primary text-white font-medium px-4 py-2 rounded-lg mr-2"
          >
            Đăng nhập
          </Link>
          <Link
            to={routes.register}
            className="border font-medium px-4 py-2 rounded-lg "
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
