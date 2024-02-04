import React from "react";
import ReactDOM from "react-dom/client";
import { Box, ChakraProvider } from "@chakra-ui/react"; // Remove this line
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box bgColor="#1A1A1A" minHeight="100vh">
        <Root />
      </Box>
    ),
    children: [
      {
        path: "/",
        element: (
          <Box bgGradient="linear(to-b, #1A1A1A, #F637EC)" minHeight="100vh">
            <EventsPage />
          </Box>
        ),
      },
      {
        path: "/event/:eventId",
        element: (
          <Box bgGradient="linear(to-b, #1A1A1A, #F637EC)" minHeight="100vh">
            <EventPage />
          </Box>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
