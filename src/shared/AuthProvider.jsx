import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import * as authService from "~/services/authService";
import routes from "~/config/routes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [role, setRole] = useState(2);
  const [loading, setLoading] = useState(false);

  const login = (data) => {
    setLoading(true);
    authService
      .login(data)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          setCurrentUser(res.data);
          setToken(res.data.token);
          setRole(res.data.role);
          navigate(routes.home);
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const register = (data) => {
    if (data.password !== data.rePassword) {
      alert("Mật khẩu không trùng khớp");
    } else {
      authService
        .Register(data)
        .then((res) => {
          if (res.data.data) {
            alert("Đăng ký thành công");
            navigate(routes.login);
          }
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  const editUser = async ({ data, id }) => {
    if (data.password !== data.rePassword) {
      alert("Passwords do not match");
    } else {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("password", data.password);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("imageUrl", data.imageUrl);

      await authService
        .editUser({ data: formData, id })
        .then((res) => {
          if (res.data) {
            alert("Updated");
            navigate(-1);
          }
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(false);
    setToken("");
    setRole("");
    navigate(routes.home);
    location.reload();
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      authService
        .getCurrentUser()
        .then((user) => {
          setCurrentUser(user.data);
          setRole(user.data.role);
          setLoading(false);
        })
        .catch((err) => {
          if (err) {
            localStorage.removeItem("token");
            setCurrentUser(false);
            setToken("");
            setRole("");
            navigate(routes.home);
          }
        });
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        token,
        loading,
        logOut,
        login,
        register,
        editUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
