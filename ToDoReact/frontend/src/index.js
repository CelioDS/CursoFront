import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 1 -  config router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Router/Home";
import Error from "./components/Router/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
