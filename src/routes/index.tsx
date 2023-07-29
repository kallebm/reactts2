import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

import { Dashboard } from "../pages/dashboard/Dashboard";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";

export const AppRoutes = () => {
  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "inbox", icon: "home", path: "/pagina-inicial" },
      { label: "Cidades", icon: "location_city", path: "/cidades" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="cidades" element={<ListagemDeCidades />} />
      {/* <Route path="cidades/detalhe/:id" element={<Dashboard />} /> */}

      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
