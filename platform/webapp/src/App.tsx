import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./features/identity/views/LoginPage";
import { Shell } from "./components/Shell";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Shell />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
