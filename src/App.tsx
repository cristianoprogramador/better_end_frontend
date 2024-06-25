import { ProjectRoutes } from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID || ""}>
        <ProjectRoutes />
        <ToastContainer position="top-center" />
      </GoogleOAuthProvider>
    </>
  );
}
