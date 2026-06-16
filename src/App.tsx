import { Layout } from "./layout/layout";
import { SignUp } from "./pages/SignUp";

/**
 * Root application component.
 *
 * Currently renders the Sign Up page inside the shared Layout shell.
 * Once react-router is added, individual pages will be routed here.
 */
export default function App() {
  return (
    <Layout>
      <SignUp />
    </Layout>
  );
}