import { Layout } from "./layout/layout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";

/**
 * Root application component.
 *
 * Currently renders the Login page inside the shared Layout shell.
 * Once react-router is added, individual pages will be routed here.
 */
export default function App() {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}