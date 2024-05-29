import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 1 -  config router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Router/Home";
import Tarefas from "../src/components/Router/Tarefas";
import Relatorios from "../src/components/Router/Relatorios";
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
