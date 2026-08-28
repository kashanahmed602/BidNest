import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {

//     if (error.response?.status === 401 && !error.config._retry) {

//       try {

//         const response = await api.post("/refresh-token");

//         const newAccessToken = response.data.accessToken;

//         localStorage.setItem(
//           "accessToken",
//           newAccessToken
//         );

//         error.config.headers.Authorization =
//           `Bearer ${newAccessToken}`;

//         return api(error.config);

//       } catch (refreshError) {

//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");

//         // window.location.href = "/login";

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/refresh-token`,
                    {},
                    {
                        withCredentials: true
                    }
                );

                const newAccessToken =
                    response.data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {

                console.log(
                    "Refresh token failed:",
                    refreshError
                );

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default api;