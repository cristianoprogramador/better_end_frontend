import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { Get } from "./pages/Get";
import { Post } from "./pages/Post";
import { Update } from "./pages/Update";
import { Delete } from "./pages/Delete";
import { WhichOne } from "./pages/WhichOne";
import { Home } from "./pages/Home";

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
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/get" element={<Get />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/which-one" element={<WhichOne />} />
            <Route path="*" element={<Navigate to="/post" replace />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}
