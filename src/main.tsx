import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LogContextProvider } from "./components/LogContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LogContextProvider>
      <App />
    </LogContextProvider>
  </StrictMode>
);
