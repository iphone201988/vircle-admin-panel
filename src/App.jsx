import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import {ProtectedRoute} from "./components/protectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
              <Login />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;