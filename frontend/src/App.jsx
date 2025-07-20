import "./App.css";
import ChatPage from "./pages/ChatPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatLayout from "./components/ChatLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/chats",
        element: <ChatPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
