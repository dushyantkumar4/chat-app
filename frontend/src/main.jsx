import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ChatProvider from "./components/context/ChatProvider.jsx";

createRoot(document.getElementById("root")).render(
  <div>
    <App />
  </div>
);
