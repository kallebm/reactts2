import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

import { Dashboard } from "../pages/dashboard/Dashboard";
import { ListagemDePessoas } from "../pages/pessoas/ListagemDePessoas";
import { DetalheDePessoas } from "../pages/pessoas/DetalheDePessoas";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";
import { DetalheDeCidades } from "../pages/cidades/DetalheDeCidades";

export const AppRoutes = () => {
  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "Página Inicial", icon: "home", path: "/pagina-inicial" },
      { label: "Cidades", icon: "location_city", path: "/cidades" },
      { label: "Pessoas", icon: "people", path: "/pessoas" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />

      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
