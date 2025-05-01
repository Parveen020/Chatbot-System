import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AdminContextProvider from "./Context/adminContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </BrowserRouter>
);
