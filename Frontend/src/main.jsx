import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigation,
} from "react-router-dom";

// NGPROGRESS
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// STYLES
import "./assets/styles/index.css";
import "./assets/styles/Global.css";

// PAGES
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { AddUser } from "./pages/user";

//PROVIDERS
import { AuthProvider } from "./context/AuthContext";

const delay = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

function AppLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    }
    NProgress.done();
  }, [navigation.state]);

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Auth />,
      //   loader: async () => {
      //     await delay(2000);
      //     return null;
      //   },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
