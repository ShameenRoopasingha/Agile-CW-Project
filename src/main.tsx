import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.tsx";
import "./index.css";

/**
 * Application entry point.
 *
 * - StrictMode highlights potential issues during development.
 * - ThemeProvider is required by Material Tailwind for theming support.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
