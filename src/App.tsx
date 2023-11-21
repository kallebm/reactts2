import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { MenuLateral } from "./shared/components";
import { AppDrawerProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { Login } from "./shared/components/login/Login";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <AppDrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </AppDrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
