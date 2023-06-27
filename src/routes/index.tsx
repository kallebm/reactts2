import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

import { Dashboard } from "../pages/dashboard/Dashboard";

export const AppRoutes = () => {
  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "inbox", icon: "home", path: "/pagina-inicial" },
      { label: "inbox", icon: "home", path: "/pagina-inicidl" },
      { label: "inbox", icon: "home", path: "/pagina-inicial" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
