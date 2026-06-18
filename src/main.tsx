import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.tsx";
import "./index.css";

/**
 * Application entry point.
 *
 * - StrictMode highlights potential issues during development.
 * - BrowserRouter enables client-side routing via react-router-dom.
 * - ThemeProvider is required by Material Tailwind for theming support.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
