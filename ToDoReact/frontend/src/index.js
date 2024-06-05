import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1 -  config router
import Error from "./components/Router/Error";
import Home from "../src/components/Router/Home";
import Tarefas from "../src/components/Router/Tarefas";
import Relatorios from "../src/components/Router/Relatorios";

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
      {
        path: "/Tarefas",
        element: <Tarefas />,
      },
      {
        path: "/Relatorios",
        element: <Relatorios />,
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
