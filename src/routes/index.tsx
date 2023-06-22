import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawer, setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "inbox", icon: "home", path: "/pagina-inicial" },
      { label: "inbox", icon: "home", path: "/pagina-inicidl" },
      { label: "inbox", icon: "home", path: "/pagina-inicial" },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <>
            <Button variant="contained" color="primary" onClick={toggleTheme}>
              Theme
            </Button>
            <Button variant="contained" color="primary" onClick={toggleDrawer}>
              Drawer
            </Button>
          </>
        }
      />
      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
    </Routes>
  );
};
