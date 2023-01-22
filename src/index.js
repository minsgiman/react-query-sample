import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Coffee from "./components/Coffee";
import Wine from "./components/Wine";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coffee />,
  },
  {
    path: "wine",
    element: <Wine />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
