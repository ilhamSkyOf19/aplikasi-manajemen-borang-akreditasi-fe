import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthService } from "../services/auth.service";
const route = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      try {
        const result = await AuthService.me();

        if (result.meta.statusCode === 200) {
          return null;
        }

        return null;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return redirect("/login");
        }

        throw err;
      }
    },
    element: <h1>hello world</h1>,
  },

  {
    path: "/login",
    loader: async () => {
      try {
        const result = await AuthService.me();

        if (result.meta.statusCode === 200) {
          return redirect("/");
        }

        return null;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return null; // tetap di login
        }

        throw err;
      }
    },
    element: <LoginPage />,
  },
]);

export default route;
