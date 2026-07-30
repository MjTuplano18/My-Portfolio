import { useState } from "react";
import LoginPage from "@/admin/LoginPage";
import AdminPage from "@/admin/AdminPage";

export default function AdminRoute() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;
  return <AdminPage onLogout={handleLogout} />;
}
