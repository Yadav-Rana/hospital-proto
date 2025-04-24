import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import mockDataService from "./services/mockDataService";

// Initialize mock data
mockDataService.initializeData();

// Import global styles
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
