import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { MainLayout } from "./components/MainLayout";

function RouteWithLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export function ProjectRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route element={<RouteWithLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
