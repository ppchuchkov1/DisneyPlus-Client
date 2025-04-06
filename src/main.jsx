import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Router>
);
