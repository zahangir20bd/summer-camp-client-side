// import { useNavigate } from "react-router-dom";

// import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";

// const useAxiosSecure = () => {
//   const { signingOut } = useAuth();
//   const navigate = useNavigate();

//   const axiosSecure = axios.create({
//     baseURL: "http://localhost:5000",
//   });

//   useEffect(() => {
//     axiosSecure.interceptors.request.use((config) => {
//       const token = localStorage.getItem("access-token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     axiosSecure.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (
//           error.response &&
//           (error.response.status === 401 || error.response.status === 403)
//         ) {
//           await signingOut();
//           navigate("/signin");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [signingOut, navigate, axiosSecure]);

//   return [axiosSecure];
// };

// export default useAxiosSecure;

// =====================================

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { signingOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await signingOut();
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );
  }, [signingOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
